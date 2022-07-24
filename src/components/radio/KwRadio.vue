<template>
  <q-radio
    class="kw-radio"
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
