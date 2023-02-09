<template>
  <q-drawer
    class="tablet-left-drawer"
    :model-value="isExpanded"
    :mini-width="40"
    :width="280"
    behavior="tablet"
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <div class="tablet-left-drawer__content">
      <tablet-left-drawer-menu />
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import TabletLeftDrawerMenu from './TabletLeftDrawerMenu.vue';

export default {
  name: 'TabletLeftDrawer',
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
