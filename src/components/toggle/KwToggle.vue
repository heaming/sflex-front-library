<template>
  <q-toggle
    class="kw-toggle spaced-sibling"
    :class="label || $slots.default ? '' : 'kw-toggle--no-label'"
    :true-value="trueValue"
    :false-value="falseValue"
    :val="val"
    :label="label ?? val"
    :left-label="!rightLabel"
    :dense="dense"
  >
    <slot />
  </q-toggle>
</template>

<script>

export default {
  name: 'KwToggle',

  props: {
    trueValue: {
      type: [String, Number, Boolean],
      default: 'Y',
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: 'N',
    },
    val: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    rightLabel: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    return {
    };
  },
};
</script>
