<template>
  <q-layout
    class="web-layout"
    view="hHh LpR lff"
    @scroll="onScroll"
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

    commit('app/setSelectedGlobalAppKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedGlobalMenuKey', menuUid || null);

    function onScroll(evt) {
      const el = document.getElementsByClassName('web-header');
      el[0].style.top = `${evt.position}px`;
    }

    return {
      isAuthenticated,
      onScroll,
    };
  },
};
</script>
