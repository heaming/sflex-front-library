<template>
  <q-drawer
    class="mobile-left-drawer"
    :model-value="isExpanded"
    :mini-width="40"
    :width="280"
    behavior="mobile"
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <div class="mobile-left-drawer__content">
      <mobile-left-drawer-menu />
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import MobileLeftDrawerMenu from './MobileLeftDrawerMenu.vue';

export default {
  name: 'WebLeftDrawer',
  components: {
    MobileLeftDrawerMenu,
  },

  setup() {
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
