<template>
  <q-checkbox
    ref="checkRef"
    class="kw-checkbox spaced-sibling"
    :class="label || $slots.default ? '' : 'kw-checkbox--no-label'"
    v-bind="styleClassAttrs"
    :model-value="modelValue"
    :true-value="trueValue"
    :false-value="falseValue"
    :indeterminate-value="indeterminateValue"
    :val="val"
    :label="label ?? val"
    :left-label="leftLabel"
    :size="size"
    :dense="dense"
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
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCheckbox',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number, Boolean],
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
      default: false,
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
      default: undefined, // 'checkbox',
    },
    uncheckedIcon: {
      type: String,
      default: undefined, // 'emptybox',
    },
    indeterminateIcon: {
      type: String,
      default: undefined, // 'indeterminate',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup() {
    const checkRef = ref();

    function toggle() {
      checkRef.value.toggle();
    }

    return {
      ...useInheritAttrs(),
      checkRef,
      toggle,
    };
  },
};
</script>
