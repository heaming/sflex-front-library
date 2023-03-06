<template>
  <q-list
    v-bind="styleClassAttrs"
    :class="listClass"
    :bordered="bordered"
    :separator="separator"
  >
    <slot>
      <!-- select all && actions -->
      <kw-item
        v-if="showSelectAll || $slots.counter || $slots.action"
        :class="selectAllItemClass"
        :clickable="clickable"
        @click="onClickSelectAllItem"
      >
        <kw-item-section
          v-if="showSelectAll"
          class="kw-list__select-all"
          side
          v-bind="selectAllAlignProps"
        >
          <kw-checkbox
            :model-value="innerSelectAll"
            class="kw-list__select-section"
            :label="$t('MSG_BTN_SELT_ALL', undefined, '전체선택')"
            :dense="$g.platform.is.mobile"
            :true-value="true"
            :false-value="false"
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
              font="pt14"
              font-weight="700"
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
      <!-- items -->
      <template
        v-for="(item) in innerItems"
        :key="item.key"
      >
        <kw-expansion-item
          v-if="expansion || item.expansion"
          :clickable="clickable"
          :class="computedItemClass[item.key]"
          :style="itemStyle"
          :active-class="activeClass"
          :disable="disable"
          :dense="dense"
          :group="group"
          :padding-target="paddingTarget"
          :expand-icon-class="computedExpandIconClass"
          :expand-icon="computedExpandIcon"
          @click="onClick(item)"
        >
          <template #header>
            <kw-item-section
              v-if="selectComponent"
              class="kw-list__select-section"
              side
              v-bind="selectAlignProps"
            >
              <kw-radio
                v-if="selectComponent === 'radio'"
                v-model="innerSelected"
                :val="item.key"
                @update:model-value="emitUpdateSelected"
              />
              <kw-checkbox
                v-if="selectComponent === 'checkbox'"
                v-model="innerSelected"
                :val="item.key"
                @update:model-value="emitUpdateSelected"
              />
            </kw-item-section>
            <slot
              name="item"
              :item="item.value"
            >
              <kw-item-section>
                {{ item.key }}
              </kw-item-section>
            </slot>
          </template>
          <template #default>
            <slot
              name="expansion"
              :item="item.value"
            >
              <kw-item>
                {{ item.expansion }}
              </kw-item>
            </slot>
          </template>
        </kw-expansion-item>
        <kw-item
          v-else
          v-bind="selectAlignProps"
          :class="computedItemClass[item.key]"
          :clickable="clickable"
          :style="itemStyle"
          :active-class="activeClass"
          :disable="disable"
          :dense="dense"
          :tag="itemTag"
          @click="onClick(item)"
        >
          <kw-item-section
            v-if="selectComponent"
            class="kw-list__select-section"
            side
            v-bind="selectAlignProps"
          >
            <kw-radio
              v-if="selectComponent === 'radio'"
              v-model="innerSelected"
              :val="item.key"
              @update:model-value="emitUpdateSelected"
            />
            <kw-checkbox
              v-if="selectComponent === 'checkbox'"
              v-model="innerSelected"
              :val="item.key"
              @update:model-value="emitUpdateSelected"
            />
          </kw-item-section>
          <slot
            name="item"
            :item="item.value"
          >
            {{ item.key }}
          </slot>
        </kw-item>
      </template>
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
import { normalizeClass } from 'vue';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { platform } from '../../plugins/platform';
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
    expansion: { type: Boolean, default: undefined },
    // fall through props
    separator: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    onClickItem: { type: Function, default: undefined },
    group: { type: String, default: undefined },
    // expansion
    paddingTarget: { type: [Array, String], default: () => ['self'] },
    expandIcon: { type: String, default: undefined },
    expandIconAlign: { type: String, default: undefined },
    expandIconClass: { type: [Array, String, Object], default: undefined },
  },
  emits: ['update:selected', 'clickItem'],
  setup(props, {
    emit,
    slots,
  }) {
    const { styleClassAttrs } = useInheritAttrs();

    const normalizeItem = (item) => ({
      key: item[props.itemKey] ?? item,
      value: item,
      expansion: item.expansion,
    });

    const innerItems = computed(() => {
      if (Array.isArray(props.items)) {
        return props.items.map(normalizeItem);
      }
      return [];
    });

    const keyDict = computed(() => {
      const registrationItem = (dict, item) => {
        const itemKey = item.key;
        dict[itemKey] = true;
        return dict;
      };
      return innerItems.value.reduce(registrationItem, {});
    });

    const updateItems = (val) => {
      if (val && Array.isArray(val)) {
        innerItems.value = val.map(normalizeItem);
      }
    };

    watch(() => props.items, updateItems);

    // activate
    const focused = ref();

    // select
    const selectComponent = computed(() => {
      if (props.radio) {
        return 'radio';
      }
      if (props.checkbox) {
        return 'checkbox';
      }
      return undefined;
    });
    const multipleSelect = computed(() => selectComponent.value === 'checkbox');
    const innerSelected = ref();
    const selectedKeyDict = computed(() => {
      if (!innerSelected.value) {
        return {};
      }
      if (!multipleSelect.value) {
        return { [innerSelected.value]: true };
      }
      const registrationItem = (dict, key) => {
        dict[key] = true;
        return dict;
      };
      return innerSelected.value.reduce(registrationItem, {});
    });

    const updateSelected = (val) => {
      if (!val) {
        innerSelected.value = multipleSelect.value ? [] : undefined;
      } else {
        innerSelected.value = multipleSelect.value ? [...val] : val;
      }
    };

    watch(multipleSelect, () => updateSelected(props.selected));
    watch(() => props.selected, updateSelected, { immediate: true });

    // counter
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

    const emitUpdateSelected = () => {
      emit('update:selected', innerSelected.value);
    };

    const innerSelectAll = computed(() => {
      if (!multipleSelect.value) {
        return;
      }
      if (!innerItems.value.length) {
        return false;
      }
      if (innerItems.value.length !== innerSelected.value.length) {
        return false;
      }
      const checkExist = (selectedItemKey) => keyDict.value[selectedItemKey];
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
      if (!multipleSelect.value) {
        return;
      }
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
      focused.value = item.value;
      if (multipleSelect.value) {
        toggleSelected(item);
      } else {
        setSelected(item);
      }
    };

    const onClickSelectAllItem = () => {
      if (!props.clickable) {
        return;
      }
      if (!multipleSelect.value) {
        return;
      }
      onUpdateSelectAll(!innerSelectAll.value);
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

    // style
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

    const basicItemClass = computed(() => {
      let classes = 'kw-list__item';
      classes = normalizeClass(classes);
      const propsClass = normalizeClass(props.itemClass);
      if (propsClass) {
        classes += ` ${propsClass}`;
      }
      return classes;
    });

    const computedItemClass = computed(() => {
      const itemClasses = {};

      innerItems.value.forEach((item) => {
        itemClasses[item.key] = {
          [basicItemClass.value]: true,
        };
        itemClasses[item.key]['kw-list__item--selected'] = !!selectedKeyDict.value[item.key];
      });
      return itemClasses;
    });

    const selectAllItemClass = computed(() => ({
      [basicItemClass.value]: true,
      'kw-list__item--total': true,
      'kw-list__item--selected': innerSelectAll.value,
    }));

    const computedExpandSideSectionClass = computed(() => {
      const classes = ['kw-item__section'];
      if (props.expandIconAlign) {
        classes.push(`kw-item__section--${props.expandIconAlign}`);
      }
      if (props.expandIconClass) {
        classes.push(props.expandIconClass);
      }
      return classes;
    });

    const defaultExpandIcon = platform.is.tablet ? 'arrow_down' : 'arrow_down_24';
    const computedExpandIcon = computed(() => props.expandIcon ?? defaultExpandIcon);

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
      onClickSelectAllItem,
      showSelectAll,
      selectComponent,
      selectAllAlignProps,
      selectAlignProps,
      selectAllItemClass,
      showPlaceholder,
      basicItemClass,
      computedItemClass,
      computedExpandIcon,
      computedExpandIconClass: computedExpandSideSectionClass,
      onBlur: () => { console.log('blur'); },
    };
  },
};
</script>
