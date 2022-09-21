<template>
  <q-page-container class="app-view">
    <q-tabs
      v-model="currentTab"
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
        :ripple="false"
      >
        <q-icon
          name="alert_24"
          size="24px"
        />
      </q-tab>
      <q-tab
        v-for="i of 30"
        :key="i"
        :name="i"
        :ripple="false"
      >
        <div class="col text-left">
          test {{ i }}
          <kw-tooltip show-when-ellipsised>
            test {{ i }}
          </kw-tooltip>
        </div>
        <q-icon
          class="cursor-pointer"
          name="close_24"
          size="12px"
          @click.stop="$g.alert('click')"
        />
      </q-tab>
    </q-tabs>

    <q-tab-panels
      v-model="currentTab"
      class="tabs-view__body"
    >
      <q-tab-panel :name="1">
        <router-view />
      </q-tab-panel>
      <q-tab-panel name="1">
        test
      </q-tab-panel>
      <q-tab-panel name="2">
        <router-view />
      </q-tab-panel>
      <q-tab-panel name="3">
        foo
      </q-tab-panel>
    </q-tab-panels>
  </q-page-container>
</template>

<script>

export default {
  name: 'AppTabsView',

  setup() {
    const currentTab = ref('2');

    return {
      currentTab,
    };
  },
};
</script>
