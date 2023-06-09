<template>
  <q-pagination
    ref="paginationRef"
    v-model="current"
    class="kw-pagination justify-center"
    :max="99"
    :max-pages="10"
    unelevated
    direction-links
    :boundary-numbers="true"
    :ripple="false"
    :ellipses="true"
    icon-first="arrow_prev"
    icon-last="arrow_next"
    icon-prev="arrow_left"
    icon-next="arrow_right"
    flat
    text-color="black2"
    active-color="bg-body"
    active-text-color="black1"
  />
</template>

<script>
export default {
  name: 'KwPaginationTest',
  setup() {
    const current = ref(1);

    return {
      current,
    };
  },
};
</script>
