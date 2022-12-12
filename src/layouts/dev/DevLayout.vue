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

    function updateSelectedGlobalKeys(route) {
      const { meta, name } = route;

      if (meta.glob === true) {
        commit('app/setSelectedGlobalAppKey', name.split('/')[1]);
        commit('app/setSelectedGlobalMenuKey', name);
      } else {
        commit('app/setSelectedGlobalMenuKey', null);
      }
    }

    const hash = window.location.hash.split('#')[1];
    const matched = getRoutes().find((v) => v.name === hash);

    if (matched) {
      updateSelectedGlobalKeys(matched);
    }

    watch(currentRoute, updateSelectedGlobalKeys);
  },
};
</script>
