<template>
  <q-drawer
    class="dev-left-drawer"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <kw-btn
      class="dev-left-drawer__btn"
      :class="{'dev-left-drawer__btn--expanded': isExpanded}"
      icon="lnb_arrow"
      borderless
      @click="toggleExpanded()"
    />

    <div class="dev-left-drawer__title">
      <h1>{{ title }}</h1>
    </div>

    <div class="dev-left-drawer__content">
      <kw-scroll-area>
        <dev-left-drawer-menu />
      </kw-scroll-area>
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import DevLeftDrawerMenu from './DevLeftDrawerMenu.vue';

export default {
  name: 'DevLeftDrawer',
  components: {
    DevLeftDrawerMenu,
  },

  setup() {
    const { getters } = useStore();
    const globalApps = getters['app/getGlobalApps'];

    const title = ref();
    const selectedGlobalAppKey = computed(() => getters['app/getSelectedGlobalAppKey']);

    watch(selectedGlobalAppKey, (appKey) => {
      title.value = globalApps.find((v) => v.key === appKey)?.label;
    }, { immediate: true });

    return {
      ...useLeftDrawerExpand(),
      title,
    };
  },
};
</script>
