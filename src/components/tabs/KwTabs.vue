<template>
  <q-tabs
    class="kw-tabs"
    :align="align"
  >
    <slot />
  </q-tabs>
</template>

<script>
export default {
  name: 'KwTabs',

  props: {
    align: {
      type: String,
      default: 'left',
    },
  },

  setup() {

  },
};
</script>
