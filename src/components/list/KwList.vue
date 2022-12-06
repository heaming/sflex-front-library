<template>
  <q-list
    v-bind="styleClassAttrs"
    class="kw-list kw-list--selectable"
    :bordered="bordered"
    :dense="dense"
    :padding="padding"
    :separator="separator"
  >
    <slot>
      <kw-item
        v-if="showSelectAll"
        class="kw-list__total-item"
      >
        <kw-item-section
          side
          top
        >
          <kw-checkbox
            :model-value="innerSelectAll"
            class="kw-list__select-all"
            :label="'전체선택'"
            :true-value="true"
            :false-value="false"
            dense
            @update:model-value="onUpdateSelectAll"
          /><!-- why... this shit... -->
        </kw-item-section>
        <kw-item-section>
          <kw-item-label
            class="kw-list__count"
            font="dense"
          >
            <slot
              name="counter"
              :selected="innerSelected"
            >
              {{ `${selectedCountWithComma}/${totalCountWithComma}` }}
            </slot>
          </kw-item-label>
        </kw-item-section>
      </kw-item>
      <kw-item
        v-for="(item, index) in innerItems"
        :key="findKey(item) || `item${index}`"
        :clickable="clickable"
        :active-class="activeClass"
        :active="activated.includes(item)"
        :disable="disable"
        :dense="dense"
        :tag="itemTag"
        @click="onClick(item)"
      >
        <kw-item-section
          side
          top
        >
          <kw-checkbox
            v-if="type === 'checkbox'"
            v-model="innerSelected"
            :val="findKey(item)"
            @change="emitUpdateSelected"
          />
          <kw-radio
            v-if="type === 'radio'"
            v-model="innerSelected"
            :val="findKey(item)"
            @change="emitUpdateSelected"
          />
        </kw-item-section>
        <kw-item-section>
          <slot
            name="item"
            :item="item"
          />
        </kw-item-section>
      </kw-item>
    </slot>
  </q-list>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { getNumberWithComma } from '../../utils/string';

export default {
  name: 'KwList',
  inheritAttrs: false,
  props: {
    // customize props
    // when if you don't use default slot,
    // under props is required for default default.
    selectAll: { type: Boolean, default: true },
    selected: { type: [Array, Object, String, Number, Boolean, Function], default: undefined },
    items: { type: Array, default: () => [] },
    itemKey: { type: String, default: undefined },
    type: { type: String, default: 'checkbox' },
    itemTag: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disable: { type: Boolean, default: undefined },
    clickable: { type: Boolean, default: undefined },
    activeClass: { type: String, default: undefined },
    // fall through props
    separator: { type: Boolean, default: undefined },
    padding: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    dense: { type: Boolean, default: undefined },
    onClickItem: { type: Function, default: undefined },
  },
  emits: ['update:selected', 'clickItem'],
  setup(props, { emit }) {
    const { styleClassAttrs } = useInheritAttrs();

    const activated = ref([]);
    const multipleSelect = computed(() => props.type === 'checkbox');
    const innerSelected = ref(props.selected ?? (multipleSelect.value ? [] : undefined));
    const innerItems = computed(() => {
      if (Array.isArray(props.items)) { return props.items; }
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
      if (val) {
        innerItems.value = [...val];
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
        const itemKey = props.itemKey ? item[props.itemKey] : item;
        dict[itemKey] = true;
        return dict;
      };
      const dict = innerItems.value.reduce(registrationItem, {});
      const checkExist = (selectedItemKey) => dict[selectedItemKey];
      return innerSelected.value.every(checkExist);
    });

    const findKey = (item) => (props.itemKey ? item[props.itemKey] : item);

    const onUpdateSelectAll = (value) => {
      if (value) {
        innerSelected.value = innerItems.value.map(findKey);
      } else {
        innerSelected.value = [];
      }
    };

    const toggleSelected = (item) => {
      if (!multipleSelect.value) { return; }
      const key = findKey(item);
      const targetIdx = innerSelected.value.indexOf(key);
      if (targetIdx > -1) {
        innerSelected.value.splice(targetIdx, 1);
      } else {
        innerSelected.value.push(key);
      }
      emitUpdateSelected();
    };

    const setSelected = (item) => {
      innerSelected.value = findKey(item);
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

    const showSelectAll = computed(() => props.selectAll && multipleSelect.value);

    return {
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
      findKey,
    };
  },
};
</script>
