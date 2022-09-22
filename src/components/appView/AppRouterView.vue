<template>
  <q-page-container class="app-view">
    <router-view v-slot="{ Component, route }">
      <load-failed-view
        v-if="isLoadFailed"
      />
      <suspense
        v-else
        :timeout="0"
        @resolve="onResolve"
      >
        <template #default>
          <component
            :is="Component"
            :key="route.path"
          />
        </template>
      </suspense>
    </router-view>
  </q-page-container>
</template>

<script>
import { loadSpinner } from '../../plugins/loading';
import consts from '../../consts';
import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'AppRouterView',
  components: { LoadFailedView },

  setup() {
    const isLoaded = ref(false);
    const isLoadFailed = ref(false);
    const { currentRoute } = useRouter();
    watch(currentRoute, () => {
      isLoaded.value = false;
      isLoadFailed.value = false;
    });
    loadSpinner(true);
    function onResolve() {
      loadSpinner(false);
      isLoaded.value = true;
    }
    onErrorCaptured(() => {
      if (!isLoaded.value) {
        loadSpinner(false);
        isLoadFailed.value = true;
      }
    });
    return {
      consts,
      isLoadFailed,
      onResolve,
    };
  },
};
</script>
