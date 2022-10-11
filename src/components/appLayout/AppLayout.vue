<template>
  <q-layout
    class="app-layout"
    view="hHh LpR fFf"
  >
    <slot />
  </q-layout>
</template>

<script>

export default {
  name: 'AppLayout',

  setup() {
    const { currentRoute } = useRouter();
    const { getters, commit } = useStore();

    const {
      applicationId,
      menuUid,
    } = currentRoute.value.meta;

    const initialGnbKey = applicationId || getters['meta/getApps'][0]?.applicationId || null;
    const initialLnbKey = menuUid || null;

    commit('app/setSelectedGnbKey', initialGnbKey);
    commit('app/setSelectedLnbKey', initialLnbKey);

    return {

    };
  },
};
</script>
