<template>
  <q-page-container class="mobile-stack-view">
    <router-view v-slot="{ Component, route }">
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
import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'MobileStackView',
  components: { LoadFailedView },

  setup() {
    return {

    };
  },
};
</script>
