<template>
  <q-page-container class="mobile-stack-view">
    <router-view
      v-if="isRouteView"
    />
    <template v-else>
      <kw-observer
        v-for="stackView of stackViews"
        :key="stackView.key"
        :ref="(vm) => stackView.observerVm = vm"
      >
        <keep-alive>
          <kw-suspense
            v-if="stackView.key === selectedKey"
          >
            <template #default>
              <component
                :is="stackView.component"
                v-bind="stackView.componentProps"
              />
            </template>
            <template #error>
              <load-failed-view />
            </template>
          </kw-suspense>
        </keep-alive>
      </kw-observer>
    </template>
  </q-page-container>
</template>

<script>
import LoadFailedView from './LoadFailedView.vue';
import useStackView from './private/useStackView';

export default {
  name: 'MobileStackView',
  components: { LoadFailedView },

  setup() {
    const { currentRoute } = useRouter();
    const isRouteView = computed(() => currentRoute.value.meta.menuUid === undefined);
    return {
      isRouteView,
      ...useStackView(),
    };
  },
};
</script>
