<template>
  <q-toggle
    ref="toggleRef"
    v-bind="styleClassAttrs"
    class="kw-toggle spaced-sibling"
    :class="{'kw-toggle--no-label': !(label || $slots.default)}"
    :model-value="modelValue"
    :true-value="trueValue"
    :false-value="falseValue"
    :indeterminate-value="indeterminateValue"
    :toggle-order="toggleOrder"
    :toggle-indeterminate="toggleIndeterminate"
    :val="val"
    :label="label ?? val"
    :left-label="leftLabel"
    :size="size"
    :dense="isSearchContext || dense"
    :checked-icon="checkedIcon"
    :unchecked-icon="uncheckedIcon"
    :indeterminate-icon="indeterminateIcon"
    :disable="disable"
    :tabindex="tabindex"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </q-toggle>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';

export default {
  name: 'KwToggle',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: 'Y',
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: 'N',
    },
    indeterminateValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    toggleOrder: {
      type: String,
      default: undefined,
    },
    toggleIndeterminate: {
      type: Boolean,
      default: false,
    },
    val: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    leftLabel: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    checkedIcon: {
      type: String,
      default: undefined,
    },
    uncheckedIcon: {
      type: String,
      default: undefined,
    },
    indeterminateIcon: {
      type: String,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    onUpdateModelValue: {
      type: Function,
      default: undefined,
    },
  },

  setup() {
    const toggleRef = ref();

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      toggleRef,
      toggle() {
        toggleRef.value.toggle();
      },
    };
  },
};
</script>
