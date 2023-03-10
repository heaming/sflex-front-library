<template>
  <q-drawer
    class="tablet-right-drawer"
    :model-value="isExpanded"
    :mini-width="40"
    :width="280"
    behavior="mobile"
    show-if-above
    side="right"
    bordered
    @update:model-value="setExpanded"
  >
    <div class="tablet-right-drawer__content">
      <tablet-left-drawer-menu />
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import TabletLeftDrawerMenu from './TabletLeftDrawerMenu.vue';

export default {
  name: 'TabletRightDrawer',
  components: {
    TabletLeftDrawerMenu,
  },

  setup() {
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
