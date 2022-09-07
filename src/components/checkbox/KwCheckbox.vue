<template>
  <q-checkbox
    class="kw-checkbox"
    :class="label ? '' : 'kw-checkbox--no-label'"
    :true-value="trueValue"
    :false-value="falseValue"
    :indeterminate-value="indeterminateValue"
    :val="val"
    :label="label ?? val"
    :checked-icon="checkedIcon"
    :unchecked-icon="uncheckedIcon"
    :indeterminate-icon="indeterminateIcon"
  >
    <slot />
  </q-checkbox>
</template>

<script>

export default {
  name: 'KwCheckbox',

  props: {
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
  },

  setup() {
    return {
    };
  },
};
</script>
