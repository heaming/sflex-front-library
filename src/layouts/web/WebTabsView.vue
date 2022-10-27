<template>
  <q-page-container class="web-view">
    <q-tabs
      :model-value="selectedKey"
      class="tabs-view__header"
      align="left"
      inline-label
      outside-arrows
      mobile-arrows
      no-caps
      left-icon="arrow_left_24"
      right-icon="arrow_right_24"
      switch-indicator
    >
      <q-tab
        class="tabs-view-home"
        :name="homeKey"
        :ripple="false"
        @click="onSelect(homeKey)"
      >
        <q-icon
          name="home"
          size="24px"
        />
      </q-tab>
      <q-tab
        v-for="tabItem of tabItems"
        :key="tabItem.key"
        :name="tabItem.key"
        :ripple="false"
        @click="onSelect(tabItem.key)"
      >
        <div class="col text-left">
          {{ tabItem.label }}
          <kw-tooltip show-when-ellipsised>
            {{ tabItem.label }}
          </kw-tooltip>
        </div>
        <q-icon
          class="cursor-pointer"
          name="close_24"
          size="12px"
          @click.stop="onClose(tabItem)"
        />
      </q-tab>
    </q-tabs>

    <q-tab-panels
      :model-value="selectedKey"
      class="tabs-view__body"
      keep-alive
    >
      <q-tab-panel :name="homeKey">
        <component :is="homeComponent" />
      </q-tab-panel>
      <q-tab-panel
        v-for="tabItem of tabItems"
        :key="tabItem.key"
        :name="tabItem.key"
      >
        <kw-observer :ref="(vm) => tabItem.observerVm = vm">
          <kw-suspense>
            <template #default>
              <component
                :is="tabItem.component"
                v-bind="tabItem.componentProps"
              />
            </template>
            <template #error>
              <load-failed-view />
            </template>
          </kw-suspense>
        </kw-observer>
      </q-tab-panel>
    </q-tab-panels>
  </q-page-container>
</template>

<script>
import useTabsView from './private/useTabsView';
import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'WebTabsView',
  components: { LoadFailedView },

  setup() {
    const tabsViewCtx = useTabsView();
    const {
      selectedKey,
      selectItem,
      selectClosestItem,
      removeItem,
    } = tabsViewCtx;

    async function onSelect(tabKey) {
      if (selectedKey.value !== tabKey) {
        await selectItem(tabKey);
      }
    }

    async function onClose(tabItem) {
      const isClosable = await tabItem.observerVm.confirmIfIsModified();
      if (isClosable) {
        const removedIndex = removeItem(tabItem);
        const isSelected = selectedKey.value === tabItem.key;
        if (isSelected) selectClosestItem(removedIndex);
      }
    }

    return {
      ...tabsViewCtx,
      onSelect,
      onClose,
    };
  },
};
</script>
