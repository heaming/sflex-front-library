<template>
  <q-page-container class="tablet-stack-view">
    <router-view
      v-if="isRouteView"
    />
    <kw-observer
      v-for="stackView of stackViews"
      v-else
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
  </q-page-container>
</template>

<script>
import LoadFailedView from './LoadFailedView.vue';
import useStackView from './private/useStackView';

export default {
  name: 'TabletStackView',
  components: { LoadFailedView },

  setup() {
    const { currentRoute } = useRouter();
    const isRouteView = computed(() => currentRoute.value.meta.menuUid === undefined);
    return {
      ...useStackView(),
      isRouteView,
    };
  },
};
</script>
