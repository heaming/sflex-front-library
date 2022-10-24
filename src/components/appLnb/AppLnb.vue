<template>
  <q-drawer
    class="app-lnb"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <app-lnb-tree />

    <app-lnb-drawer />
  </q-drawer>
</template>

<script>
import useLnbExpand from './private/useLnbExpand';

import AppLnbTree from './AppLnbTree.vue';
import AppLnbDrawer from './AppLnbDrawer.vue';

export default {
  name: 'AppLnb',
  components: {
    AppLnbTree,
    AppLnbDrawer,
  },

  setup() {
    const { isExpanded } = useLnbExpand();

    return {
      isExpanded,
    };
  },
};
</script>
