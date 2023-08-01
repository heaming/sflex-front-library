<template>
  <q-page-container class="web-tab-view">
    <router-view
      v-if="isRouteView"
    />
    <q-tabs
      v-else
      :model-value="selectedKey"
      class="web-tab-view__header"
      align="left"
      inline-label
      no-caps
    >
      <q-tab
        v-for="tab of tabs"
        :key="tab.key"
        :name="tab.key"
        :ripple="false"
        :class="{'q-tab--custom-active': isActive(tab.key)}"
        @click="onSelect(tab.key)"
      >
        <div class="col text-left">
          {{ tab.label }}
          <kw-tooltip
            show-when-ellipsised
            :offset="[-10, 15]"
            anchor="bottom start"
            self="center start"
            class="tab_tooltip"
          >
            {{ tab.label }}
          </kw-tooltip>
        </div>
        <q-icon
          name="close_24"
          @click.stop="onClose(tab.key)"
        />
      </q-tab>
    </q-tabs>

    <web-tab-view-panels
      :model-value="selectedKey"
      class="web-tab-view__content"
    >
      <web-tab-view-panel
        v-for="tabView of tabViews"
        :key="tabView.key"
        :name="tabView.key"
      >
        <kw-observer
          :ref="(vm) => tabView.observerVm = vm"
        >
          <kw-suspense>
            <template #default>
              <component
                :is="tabView.component"
                v-bind="tabView.componentProps"
                :key="`${tabView.component.__name}_${tabView.refresh}`"
                @slot-re-render="refreshView(tabView)"
              />
            </template>
            <template #error>
              <load-failed-view />
            </template>
          </kw-suspense>
        </kw-observer>
      </web-tab-view-panel>
    </web-tab-view-panels>
  </q-page-container>
</template>

<script>
import useTabView from './private/useTabView';

import WebTabViewPanels from './WebTabViewPanels.vue';
import WebTabViewPanel from './WebTabViewPanel.vue';
import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'WebTabView',
  components: {
    WebTabViewPanels,
    WebTabViewPanel,
    LoadFailedView,
  },

  setup() {
    const { currentRoute } = useRouter();
    const isRouteView = computed(() => currentRoute.value.meta.menuUid === undefined);
    function refreshView(view) {
      view.refresh += 1;
    }
    return {
      ...useTabView(),
      isRouteView,
      refreshView,
    };
  },
};
</script>
