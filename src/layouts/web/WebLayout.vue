<template>
  <q-layout
    class="web-layout"
    view="hHh LpR lff"
  >
    <slot
      v-if="isAuthenticated"
      name="default"
    />
    <slot
      v-else-if="isCustDomain"
      name="custdomain"
    />
    <slot
      v-else
      name="unauthenticated"
    />
  </q-layout>
</template>

<script>
import env from '../../consts/private/env';

export default {
  name: 'WebLayout',

  setup() {
    const { getters, commit } = useStore();
    const { currentRoute } = useRouter();

    const isAuthenticated = computed(() => getters['meta/isAuthenticated']);
    console.log(env.VITE_HTTP_ORIGIN, env.VITE_HTTP_CUST_ORIGIN);
    const isCustDomain = window.location.origin === env.VITE_HTTP_CUST_ORIGIN;
    const { menuUid } = currentRoute.value.meta;

    // commit('app/setSelectedGlobalAppKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedGlobalAppKey', null);
    commit('app/setSelectedGlobalMenuKey', menuUid || null);

    return {
      isAuthenticated,
      isCustDomain,
    };
  },
};
</script>
