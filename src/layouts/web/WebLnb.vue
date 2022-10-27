<template>
  <q-drawer
    class="web-lnb overflow-hidden"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <q-scroll-area>
      <web-lnb-tree />
    </q-scroll-area>

    <web-lnb-drawer />
  </q-drawer>
</template>

<script>
import useLnbExpand from './private/useLnbExpand';

import WebLnbTree from './WebLnbTree.vue';
import WebLnbDrawer from './WebLnbDrawer.vue';

export default {
  name: 'WebLnb',
  components: {
    WebLnbTree,
    WebLnbDrawer,
  },

  setup() {
    const { isExpanded } = useLnbExpand();

    return {
      isExpanded,
    };
  },
};
</script>
