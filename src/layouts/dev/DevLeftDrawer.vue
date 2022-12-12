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
      @click="toggleExpanded"
    />

    <kw-scroll-area
      style="height: 100%;"
      scroll-area-width="100%"
    >
      <dev-left-drawer-menu />
    </kw-scroll-area>
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
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
