<template>
  <q-checkbox
    class="kw-checkbox"
    :true-value="trueValue"
    :false-value="falseValue"
    :val="val"
    :label="label ?? val"
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
