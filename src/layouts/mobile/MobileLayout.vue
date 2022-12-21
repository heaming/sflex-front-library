<template>
  <q-layout
    class="mobile-layout"
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
  name: 'MobileLayout',

  setup() {
    const { getters, commit } = useStore();
    const { currentRoute } = useRouter();

    const isAuthenticated = computed(() => getters['meta/isAuthenticated']);

    const { applicationId, menuUid } = currentRoute.value.meta;
    const firstApplicationId = getters['meta/getApps'][0]?.applicationId;

    commit('app/setSelectedGlobalAppKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedGlobalMenuKey', menuUid || null);

    return {
      isAuthenticated,
    };
  },
};
</script>
