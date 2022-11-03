<template>
  <q-slider v-model="value" />
</template>

<script>
export default {
  name: 'KwSlider',
  setup() {
    return {
      value: ref(0),
    };
  },
};
</script>

<style scoped>

</style>
