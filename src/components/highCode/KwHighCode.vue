<template>
  <div
    class="kw-high-code kw-guide-code active"
  >
    <high-code
      :code-value="codeValue"
      :lang="lang"
      theme="light"
      width="100%"
      :height="height"
      :max-height="maxHeight"
    />
  </div>
</template>

<script>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

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
    return {
    };
  },
};
</script>
