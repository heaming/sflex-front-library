<template>
  <q-page-container class="web-router-view">
    <router-view
      v-if="useRouterView"
      v-slot="{ Component, route }"
    >
      <kw-suspense :key="route.fullPath">
        <template #default>
          <component :is="Component" />
        </template>
        <template #error>
          <load-failed-view />
        </template>
      </kw-suspense>
    </router-view>
  </q-page-container>
</template>

<script>
import useEntryPopup from '../../composables/private/useEntryPopup';

import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'WebRouterView',
  components: { LoadFailedView },

  setup() {
    return {
      ...useEntryPopup(),
    };
  },
};
</script>
