<template>
  <q-toggle
    class="kw-toggle"
    :true-value="trueValue"
    :false-value="falseValue"
    :val="val"
    :label="label ?? val"
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
  },

  setup() {
    return {

    };
  },
};
</script>
