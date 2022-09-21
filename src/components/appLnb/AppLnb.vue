<template>
  <q-drawer
    class="app-lnb"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <app-lnb-menus />

    <app-lnb-drawer />
  </q-drawer>
</template>

<script>
import AppLnbMenus from './AppLnbMenus.vue';
import AppLnbDrawer from './AppLnbDrawer.vue';

export default {
  name: 'AppLnb',
  components: {
    AppLnbMenus,
    AppLnbDrawer,
  },

  setup() {
    const { getters } = useStore();
    const isExpanded = computed(() => getters['app/getLnbExpanded']);

    return {
      isExpanded,
    };
  },
};
</script>
