<template>
  <high-code
    ref="highCodeRef"
    :code-value="codeValue"
    :lang="lang"
    theme="light"
    width="100%"
    :height="height"
    :max-height="maxHeight"
  />
</template>

<script>
import { HighCode } from 'vue-highlight-code';

export default {
  name: 'KwHighCode',
  components: { HighCode },
  inheritAttrs: false,
  props: {
    lang: {
      type: [String, Array],
      default: null,
    },
    codeValue: {
      type: [String, Array],
      default: null,
    },
    height: {
      type: String,
      default: 'auto',
    },
    maxHeight: {
      type: String,
      default: 'auto',
    },
  },
  setup() {
    const highCodeRef = ref();
    return {
      highCodeRef,
    };
  },
};
</script>
