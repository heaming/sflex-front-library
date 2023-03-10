<template>
  <q-layout
    class="tablet-layout"
    view="lhr lpR lFr"
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
  name: 'TabletLayout',

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
