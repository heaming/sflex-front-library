<template>
  <q-page-container class="web-tab-view">
    <q-tabs
      :model-value="selectedKey"
      class="web-tab-view__header"
      align="left"
      inline-label
      no-caps
    >
      <q-tab
        v-for="tabView of tabViews"
        :key="tabView.key"
        :name="tabView.key"
        :ripple="false"
        @click="onSelect(tabView.key)"
      >
        <div class="col text-left">
          {{ tabView.label }}
          <kw-tooltip show-when-ellipsised>
            {{ tabView.label }}
          </kw-tooltip>
        </div>
        <q-icon
          class="cursor-pointer"
          name="close_24"
          size="12px"
          @click.stop="onClose(tabView)"
        />
      </q-tab>
    </q-tabs>

    <q-tab-panels
      :model-value="selectedKey"
      class="web-tab-view__content"
      keep-alive
    >
      <q-tab-panel
        v-for="tabView of tabViews"
        :key="tabView.key"
        :name="tabView.key"
      >
        <kw-observer :ref="(vm) => tabView.observerVm = vm">
          <kw-suspense>
            <template #default>
              <component
                :is="tabView.component"
                v-bind="tabView.componentProps"
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
import useTabView from './private/useTabView';
import LoadFailedView from './LoadFailedView.vue';

export default {
  name: 'WebTabView',
  components: { LoadFailedView },

  setup() {
    const tabViewCtx = useTabView();
    const {
      selectedKey,
      select,
      selectClosest,
      remove,
    } = tabViewCtx;

    async function onSelect(tabKey) {
      if (selectedKey.value !== tabKey) {
        await select(tabKey);
      }
    }

    async function onClose(tabItem) {
      const isClosable = await tabItem.observerVm.confirmIfIsModified();
      if (isClosable) {
        const removedIndex = remove(tabItem);
        const isSelected = selectedKey.value === tabItem.key;

        if (isSelected) {
          selectClosest(removedIndex);
        }
      }
    }

    return {
      ...tabViewCtx,
      onSelect,
      onClose,
    };
  },
};
</script>
