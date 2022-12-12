<template>
  <q-drawer
    class="web-left-drawer"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <kw-btn
      class="web-left-drawer__btn"
      :class="{'web-left-drawer__btn--expanded': isExpanded}"
      icon="lnb_arrow"
      borderless
      @click="toggleExpanded"
    />

    <q-scroll-area>
      <web-left-drawer-menu />
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import WebLeftDrawerMenu from './WebLeftDrawerMenu.vue';

export default {
  name: 'WebLeftDrawer',
  components: {
    WebLeftDrawerMenu,
  },

  setup() {
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
