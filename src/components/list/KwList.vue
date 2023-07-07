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
      >
        <kw-item-section
          v-if="showSelectAll"
          class="kw-list__select-all"
          side
          v-bind="selectAllAlignProps"
          :clickable="clickable"
          @click="onClickSelectAllItem"
        >
          <kw-checkbox
            :model-value="innerSelectAll"
            class="kw-list__select-section"
            :label="$t('MSG_BTN_SELT_ALL', undefined, '전체선택')"
            dense
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
        v-for="(item, index) in innerItems"
        :key="item.key"
      >
        <kw-expansion-item
          v-if="expansion || item.expansion"
          :ref="'KwExpansionItem' + index"
          :clickable="clickable"
          :class="computedItemClass[item.key]"
          :style="itemStyle"
          :active-class="activeClass"
          block-inherit-padding
          :disable="disable"
          :dense="dense"
          :group="group"
          :padding-target="paddingTarget"
          :expand-icon-class="computedExpandIconClass"
          :expand-icon="computedExpandIcon"
          :expand-icon-toggle="expandIconToggle"
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
                :ref="'SelectableComponent' + index"
                v-model="innerSelected"
                :val="item.key"
                :disable="item.value.disable"
                @update:model-value="emitUpdateSelected"
              />
              <kw-checkbox
                v-else-if="selectComponent === 'checkbox'"
                :ref="'SelectableComponent' + index"
                v-model="innerSelected"
                :val="item.key"
                :disable="item.value.disable"
                @update:model-value="emitUpdateSelected"
              />
            </kw-item-section>
            <kw-item-section>
              <kw-item
                v-bind="selectAlignProps"
                :class="computedItemClass[item.key]"
                :clickable="clickable"
                :style="itemStyle"
                :active-class="activeClass"
                :disable="disable"
                :dense="dense"
                :tag="itemTag"
                @click="onClick(item, $refs['KwExpansionItem' + index], $refs['SelectableComponent' + index])"
              >
                <slot
                  name="item"
                  :item="item.value"
                >
                  <kw-item-section>
                    {{ item.key }}
                  </kw-item-section>
                </slot>
              </kw-item>
            </kw-item-section>
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
        >
          <kw-item-section
            v-if="selectComponent"
            class="kw-list__select-section"
            side
            v-bind="selectAlignProps"
          >
            <kw-radio
              v-if="selectComponent === 'radio'"
              :ref="'SelectableComponent' + index"
              v-model="innerSelected"
              :val="item.key"
              :disable="item.value.disable"
              @update:model-value="emitUpdateSelected"
            />
            <kw-checkbox
              v-else-if="selectComponent === 'checkbox'"
              :ref="'SelectableComponent' + index"
              v-model="innerSelected"
              :val="item.key"
              :disable="item.value.disable"
              @update:model-value="emitUpdateSelected"
            />
          </kw-item-section>
          <kw-item-section>
            <kw-item
              v-bind="selectAlignProps"
              :class="computedItemClass[item.key]"
              :clickable="clickable"
              :style="itemStyle"
              :active-class="activeClass"
              :disable="disable"
              :dense="dense"
              :tag="itemTag"
              @click="onClick(item, null, $refs['SelectableComponent' + index])"
            >
              <slot
                name="item"
                :item="item.value"
              >
                <kw-item-section>
                  {{ item.key }}
                </kw-item-section>
              </slot>
            </kw-item>
          </kw-item-section>
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
    <q-dialog
      v-if="isShowBottomSheet"
      ref="dialogRef"
      v-bind="styleClassAttrs"
      :model-value="showing"
      :class="dialogClass"
      :persistent="persistent"
      :no-refocus="noRefocus"
      :no-focus="noFocus"
      :no-shake="true"
      transition-show="jump-up"
      transition-hide="jump-down"
      class="custom_bottom_sheet"
      @update:model-value="onUpdateShowing"
    >
      <div>
        <kw-scroll-area
          class="kw-menu-dialog__scroll-area"
        >
          <div class="kw-menu-dialog__header">
            <h1>{{ dialogTitle }}</h1>
            <q-icon
              name="close_24"
              @click="onUpdateShowing(false)"
            />
          </div>
          <!-- start//  dialog 옵션 리스트 -->
          <ul
            class="kw-menu-dialog__content"
          >
            <li
              v-for="(dialogOption, dialogIdx) in dialogOptions"
              :key="dialogIdx"
              @click="onClickOption(dialogOption)"
            >
              {{ dialogOption[dialogOptionLabel] }}
            </li>
          </ul>
        </kw-scroll-area>
      </div>
    </q-dialog>
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
    clickable: { type: Boolean, default: false },
    itemClass: { type: [Array, Object, String], default: undefined },
    itemStyle: { type: [Array, Object, String], default: undefined },
    activeClass: { type: String, default: undefined },
    expansion: { type: Boolean, default: undefined },
    // fall through props
    separator: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    group: { type: String, default: undefined },
    // expansion
    paddingTarget: { type: [Array, String], default: () => ['self'] },
    expandIcon: { type: String, default: undefined },
    expandIconAlign: { type: String, default: undefined },
    expandIconClass: { type: [Array, String, Object], default: undefined },
    expandIconToggle: { type: Boolean, default: true },
    persistent: { type: Boolean, default: false },
    noRefocus: { type: Boolean, default: false },
    noFocus: { type: Boolean, default: false },
    dialogOptions: { type: Array, default: () => [] },
    useDialog: { type: Boolean, default: false },
    dialogTitle: { type: String, default: undefined },
    dialogOptionLabel: { type: String, default: 'label' },
    dialogOptionValue: { type: String, default: 'value' },
  },
  emits: ['update:selected', 'click-item', 'click-option'],
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

    // dialog 옵션
    const showing = ref(false);
    function onUpdateShowing(val) {
      const onUpdateModelValue = props['onUpdate:modelValue'];
      if (onUpdateModelValue) onUpdateModelValue(val);
      else showing.value = val;
    }

    const dialogClass = computed(() => ({
      'kw-menu-dialog': true,
      'kw-menu-dialog--no-action': slots.dialogAction === undefined,
    }));

    // activate
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
      const filteredDisabledItems = innerItems.value.filter((item) => !item.value.disable);
      if (!multipleSelect.value) {
        return;
      }
      if (!filteredDisabledItems.length) {
        return false;
      }
      if (filteredDisabledItems.length !== innerSelected.value.length) {
        return false;
      }
      const checkExist = (selectedItemKey) => keyDict.value[selectedItemKey];
      return innerSelected.value.every(checkExist);
    });

    const onUpdateSelectAll = (value) => {
      if (value) {
        innerSelected.value = innerItems.value.filter((item) => !item.value.disable).map((item) => (item.key));
      } else {
        innerSelected.value = [];
      }
      emitUpdateSelected();
    };

    const isShowBottomSheet = computed(() => platform.is.mobile && props.useDialog && props.dialogOptions.length);

    const onClick = (item, elementExpansionItem, elementSelectableComponent) => {
      emit('click-item', item);

      if (isShowBottomSheet) {
        onUpdateShowing(!showing.value);
      }

      if (!props.clickable) {
        return;
      }

      if (selectComponent.value && elementSelectableComponent) {
        if (selectComponent.value === 'radio') {
          elementSelectableComponent[0].set();
        } else if (selectComponent.value === 'checkbox') {
          elementSelectableComponent[0].toggle();
        }
      } else if (isShowBottomSheet && elementExpansionItem) {
        elementExpansionItem[0].toggle();
      }
    };

    function onClickOption(option) {
      emit('click-option', option);
      onUpdateShowing(false);
    }

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
        itemClasses[item.key]['mobile-item'] = platform.is.mobile;
        itemClasses[item.key]['tablet-item'] = platform.is.tablet;
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
      onUpdateShowing,
      showing,
      dialogClass,
      onClickOption,
      isShowBottomSheet,
    };
  },
};
</script>
