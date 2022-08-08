<template>
  <div class="kw-guide-codeButton">
    <button @click="active = !active">
      Show code &darr;
    </button>
  </div>
  <div
    class="kw-guide-code"
    :class="{'active': active}"
  >
    <HighCode
      :code-value="codeValue"
      :lang="lang"
      theme="light"
      width="100%"
      height="auto"
    />
  </div>
</template>

<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

defineProps({
  lang: {
    type: String,
    default: 'vue',
  },
  codeValue: {
    type: String,
    default: '',
  },
});

const active = ref(false);
</script>

<style lang="scss" scoped>
.kw-guide-code {
  display: none;

  &.active {
    display: block;
  }
}
</style>
