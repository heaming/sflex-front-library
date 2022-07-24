<template>
  <q-tab-panels
    class="kw-tab-panels"
    keep-alive
  >
    <slot />
  </q-tab-panels>
</template>

<script>
export default {
  name: 'KwTabPanels',

  setup() {

  },
};
</script>
