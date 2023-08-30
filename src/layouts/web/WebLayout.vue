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
    const user = getters['meta/getUserInfo'];

    const isAuthenticated = computed(() => getters['meta/isAuthenticated']);
    const isCustDomain = window.location.origin === env.VITE_HTTP_CUST_ORIGIN || user.userId === 'anonymous';

    const { applicationId, menuUid } = currentRoute.value.meta;

    // commit('app/setSelectedGlobalAppKey', applicationId || firstApplicationId || null);
    commit('app/setSelectedGlobalAppKey', applicationId || null); // 새로고침 시 leftDrawer에 현재 메뉴 표시가 되지 않아 수정함
    commit('app/setSelectedGlobalMenuKey', menuUid || null);

    return {
      isAuthenticated,
      isCustDomain,
    };
  },
};
</script>
