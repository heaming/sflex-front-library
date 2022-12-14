<template>
  <q-drawer
    class="dev-left-drawer"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <kw-btn
      class="dev-left-drawer__btn"
      :class="{'dev-left-drawer__btn--expanded': isExpanded}"
      icon="lnb_arrow"
      borderless
      @click="toggleExpanded()"
    />

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
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
