<template>
  <q-layout
    class="dev-layout"
    view="hHh LpR fFf"
  >
    <slot />
  </q-layout>
</template>

<script>

export default {
  name: 'DevLayout',

  setup() {
    const { commit } = useStore();
    const { getRoutes, currentRoute } = useRouter();

    function updateSelectedGnbLnb(route) {
      const { meta, name } = route;

      if (meta.isGlobImport) {
        commit('app/setSelectedGnbKey', name.split('/')[1]);
        commit('app/setSelectedLnbKey', name);
      } else {
        commit('app/setSelectedLnbKey', null);
      }
    }

    const hash = window.location.hash.split('#')[1];
    const matched = getRoutes().find((v) => v.name === hash);

    if (matched) {
      updateSelectedGnbLnb(matched);
    }

    watch(currentRoute, updateSelectedGnbLnb);
  },
};
</script>
