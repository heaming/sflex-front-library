<template>
  <q-checkbox
    ref="checkRef"
    v-bind="styleClassAttrs"
    class="kw-checkbox spaced-sibling"
    :class="{'kw-checkbox--no-label': !(label || $slots.default)}"
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
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-checkbox>
</template>

<script>
import { FormTypeContextKey } from '../../consts/private/symbols';
import { FORM_TYPE } from '../../composables/private/useFormType';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCheckbox',
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
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: undefined,
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
  },

  emits: [
    'update:modelValue',
  ],

  setup() {
    const isSearchContext = inject(FormTypeContextKey, null) === FORM_TYPE.SEARCH;
    const checkRef = ref();

    return {
      ...useInheritAttrs(),
      isSearchContext,
      checkRef,
      toggle() {
        checkRef.value.toggle();
      },
    };
  },
};
</script>
