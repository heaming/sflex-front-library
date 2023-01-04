<template>
  <q-list
    v-bind="styleClassAttrs"
    :class="listClass"
    :bordered="bordered"
    :separator="separator"
  >
    <slot>
      <kw-item
        v-if="showSelectAll || $slots.counter || $slots.action"
        class="kw-list__total-item"
      >
        <kw-item-section
          v-if="showSelectAll"
          side
          v-bind="selectAllAlignProps"
        >
          <kw-checkbox
            :model-value="innerSelectAll"
            class="kw-list__select-all"
            :label="$t('MSG_BTN_SELT_ALL', undefined, '전체선택')"
            :true-value="true"
            :false-value="false"
            dense
            @update:model-value="onUpdateSelectAll"
          />
        </kw-item-section>
        <slot
          name="counter"
          :selected="innerSelected"
        >
          <kw-item-section>
            <kw-item-label
              class="kw-list__count"
              font="dense"
            >
              {{ `${selectedCountWithComma}/${totalCountWithComma}` }}
            </kw-item-label>
          </kw-item-section>
        </slot>
        <kw-item-section
          v-if="$slots.action"
          class="kw-list__action-container"
          side
        >
          <slot name="action" />
        </kw-item-section>
      </kw-item>
      <kw-item
        v-for="(item) in innerItems"
        v-bind="selectAlignProps"
        :key="item.key"
        :clickable="clickable"
        :class="itemClass"
        :style="itemStyle"
        :active-class="activeClass"
        :active="activated.includes(item)"
        :disable="disable"
        :dense="dense"
        :tag="itemTag"
        @click="onClick(item)"
      >
        <kw-item-section
          v-if="selectComponent"
          side
          v-bind="selectAlignProps"
        >
          <kw-radio
            v-if="selectComponent === 'radio'"
            v-model="innerSelected"
            :val="item.key"
            @change="emitUpdateSelected"
          />
          <kw-checkbox
            v-if="selectComponent === 'checkbox'"
            v-model="innerSelected"
            :val="item.key"
            @change="emitUpdateSelected"
          />
        </kw-item-section>
        <slot
          name="item"
          :item="item.value"
        >
          {{ item.key }}
        </slot>
      </kw-item>
      <div
        v-if="showPlaceholder"
        class="kw-list__placeholder"
      >
        <slot
          v-if="showPlaceholder"
          name="placeholder"
        >
          {{ placeholder }}
        </slot>
      </div>
    </slot>
  </q-list>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { getNumberWithComma } from '../../utils/string';
import { ListContextKey } from '../../consts/private/symbols';
import useDense, { useDenseProps } from '../../composables/private/useDense';

export default {
  name: 'KwList',
  inheritAttrs: false,
  props: {
    // customize props
    // when if you don't use default slot,
    // under props is required for default default.
    ...useDenseProps,
    itemPadding: { type: [String, Boolean], default: undefined },

    hideSelectAll: { type: Boolean, default: false },
    selected: { type: [Array, Object, String, Number], default: undefined },
    items: { type: Array, default: () => [] },
    itemKey: { type: String, default: 'key' },
    checkbox: { type: Boolean, default: false },
    radio: { type: Boolean, default: false },
    selectAlign: { type: String, default: 'top' },
    selectAllAlign: { type: String, default: 'center' },
    itemTag: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disable: { type: Boolean, default: undefined },
    clickable: { type: Boolean, default: undefined },
    itemClass: { type: [Array, Object, String], default: undefined },
    itemStyle: { type: [Array, Object, String], default: undefined },
    activeClass: { type: String, default: undefined },
    // fall through props
    separator: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    onClickItem: { type: Function, default: undefined },
  },
  emits: ['update:selected', 'clickItem'],
  setup(props, { emit, slots }) {
    const { styleClassAttrs } = useInheritAttrs();

    const activated = ref([]);
    const selectComponent = computed(() => {
      if (props.radio) { return 'radio'; }
      if (props.checkbox) { return 'checkbox'; }
      return undefined;
    });
    const multipleSelect = computed(() => selectComponent.value === 'checkbox');
    const innerSelected = ref(props.selected ?? (multipleSelect.value ? [] : undefined));
    const normalizeItem = (item) => ({
      key: item[props.itemKey] ?? item,
      value: item,
    });

    const innerItems = computed(() => {
      if (Array.isArray(props.items)) { return props.items.map(normalizeItem); }
      return [];
    });
    const totalCountWithComma = computed(() => (
      multipleSelect.value
        ? getNumberWithComma(innerItems.value.length)
        : undefined
    ));
    const selectedCountWithComma = computed(() => (
      multipleSelect.value
        ? getNumberWithComma(innerSelected.value.length)
        : undefined
    ));

    const updateSelected = (val) => {
      if (!val) { return; }
      if (multipleSelect.value) {
        innerSelected.value = [...val];
      }
      innerSelected.value = val;
    };

    watch(() => props.selected, updateSelected);

    const updateItems = (val) => {
      if (val && Array.isArray(val)) {
        innerItems.value = val.map(normalizeItem);
      }
    };

    watch(() => props.items, updateItems);

    const emitUpdateSelected = () => {
      emit('update:selected', innerSelected.value);
    };

    const innerSelectAll = computed(() => {
      if (!multipleSelect.value) { return; }
      if (!innerItems.value.length) { return false; }
      if (innerItems.value.length !== innerSelected.value.length) { return false; }
      const registrationItem = (dict, item) => {
        const itemKey = item.key;
        dict[itemKey] = true;
        return dict;
      };
      const dict = innerItems.value.reduce(registrationItem, {});
      const checkExist = (selectedItemKey) => dict[selectedItemKey];
      return innerSelected.value.every(checkExist);
    });

    const onUpdateSelectAll = (value) => {
      if (value) {
        innerSelected.value = innerItems.value.map((item) => (item.key));
      } else {
        innerSelected.value = [];
      }
    };

    const toggleSelected = (item) => {
      if (!multipleSelect.value) { return; }
      const { key } = item;
      const targetIdx = innerSelected.value.indexOf(key);
      if (targetIdx > -1) {
        innerSelected.value.splice(targetIdx, 1);
      } else {
        innerSelected.value.push(key);
      }
      emitUpdateSelected();
    };

    const setSelected = (item) => {
      innerSelected.value = item.key;
      emitUpdateSelected();
    };

    const onClick = (item) => {
      if (!props.clickable) {
        return;
      }
      if (props.onClickItem) {
        props.onClickItem(item);
        return;
      }
      activated.value = [item];
      if (multipleSelect.value) {
        toggleSelected(item);
      } else {
        setSelected(item);
      }
    };

    const showSelectAll = computed(() => !props.hideSelectAll && multipleSelect.value);

    const selectAlignProps = computed(() => ({
      top: props.selectAlign === 'top',
      center: props.selectAlign === 'center',
      bottom: props.selectAlign === 'bottom',
    }));

    const selectAllAlignProps = computed(() => ({
      top: props.selectAllAlign === 'top',
      center: props.selectAllAlign === 'center',
      bottom: props.selectAllAlign === 'bottom',
    }));

    const showPlaceholder = computed(() => (innerItems.value?.length === 0)
      && (props.placeholder || slots.placeholder));

    const computedDense = useDense();

    const listClass = computed(() => ({
      'kw-list': true,
      'kw-list--selectable': showSelectAll.value,
      'kw-list--dense': computedDense.value,
      'kw-list--padding': props.itemPadding === true,
    }));

    const listProvideContext = {
      padding: computed(() => props.itemPadding),
    };

    provide(ListContextKey, listProvideContext);

    return {
      listClass,
      innerSelected,
      styleClassAttrs,
      totalCountWithComma,
      selectedCountWithComma,
      innerSelectAll,
      innerItems,
      onUpdateSelectAll,
      emitUpdateSelected,
      onClick,
      showSelectAll,
      activated,
      selectComponent,
      selectAllAlignProps,
      selectAlignProps,
      showPlaceholder,
    };
  },
};
</script>
