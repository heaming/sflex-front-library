<template>
  <q-expansion-item
    class="kw-expansion-item"
    expand-icon="arrow_down_24"
  >
    <slot />
  </q-expansion-item>
</template>

<script>
export default {
  name: 'KwExpansionItem',
};
</script>
