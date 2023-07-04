<template>
  <div
    v-if="button"
    class="kw-high-code kw-guide-codeButton"
  >
    <button @click="active = !active">
      <span v-if="!active">
        Show code &darr;
      </span>
      <span v-else>
        Hide code &uarr;
      </span>
    </button>
  </div>
  <div
    class="kw-high-code kw-guide-code"
    :class="{'active': active || !button}"
  >
    <template v-if="multi">
      <HighCode
        v-for="(code,index) in codeValue"
        :key="index"
        :code-value="code"
        :lang="lang[index]"
        theme="light"
        width="100%"
        height="auto"
        :class="!index[0] ? 'mt30' : ''"
      />
    </template>
    <template v-else>
      <HighCode
        :code-value="codeValue"
        :lang="lang"
        theme="light"
        width="100%"
        height="auto"
      />
    </template>
  </div>
</template>

<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

defineProps({
  multi: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: [String, Array],
    default: null,
  },
  codeValue: {
    type: [String, Array],
    default: null,
  },
  button: {
    type: Boolean,
    default: false,
  },
});
const active = ref(false);
</script>
