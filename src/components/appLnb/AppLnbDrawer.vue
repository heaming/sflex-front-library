<template>
  <kw-btn
    class="app-lnb-drawer"
    :class="{'app-lnb-drawer--expanded': isExpanded}"
    icon="lnb_arrow"
    borderless
    @click="onClickDrawer"
  />
</template>

<script>
export default {
  name: 'AppLnbDrawer',

  setup() {
    const { getters, commit } = useStore();
    const isExpanded = computed(() => getters['app/getLnbExpanded']);

    function onClickDrawer() {
      commit('app/setLnbExpanded', !isExpanded.value);
    }

    return {
      isExpanded,
      onClickDrawer,
    };
  },
};
</script>
