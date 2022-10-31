<template>
  <q-layout
    class="web-layout"
    view="hHh LpR fFf"
  >
    <slot
      v-if="isAuthenticated"
    />
    <slot
      v-else
      name="unauthenticated"
    />
  </q-layout>
</template>

<script>

export default {
  name: 'WebLayout',

  setup() {
    const { getters, commit } = useStore();
    const { currentRoute } = useRouter();

    const isAuthenticated = computed(() => getters['meta/isAuthenticated']);

    const { applicationId, menuUid } = currentRoute.value.meta;
    const firstApplicationId = getters['meta/getApps'][0]?.applicationId;

    commit('app/setSelectedGnbKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedLnbKey', menuUid || null);

    return {
      isAuthenticated,
    };
  },
};
</script>
