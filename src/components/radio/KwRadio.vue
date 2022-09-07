<template>
  <q-radio
    class="kw-radio spaced-sibling"
    :class="label || $slots.default ? '' : 'kw-radio--no-label'"
    :val="val"
    :label="label ?? val"
  >
    <slot />
  </q-radio>
</template>

<script>

export default {
  name: 'KwRadio',

  props: {
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
