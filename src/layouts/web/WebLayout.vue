<template>
  <q-layout
    class="web-layout"
    view="hHh LpR lff"
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

    const { menuUid } = currentRoute.value.meta;

    // commit('app/setSelectedGlobalAppKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedGlobalAppKey', null);
    commit('app/setSelectedGlobalMenuKey', menuUid || null);

    return {
      isAuthenticated,
    };
  },
};
</script>
