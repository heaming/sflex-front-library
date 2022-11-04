<template>
  <q-drawer
    class="dev-lnb"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <kw-scroll-area scroll-area-width="100%">
      <dev-lnb-tree />
    </kw-scroll-area>

    <dev-lnb-drawer />
  </q-drawer>
</template>

<script>
import useLnbExpand from '../../composables/private/useLnbExpand';

import DevLnbTree from './DevLnbTree.vue';
import DevLnbDrawer from './DevLnbDrawer.vue';

export default {
  name: 'DevLnb',
  components: {
    DevLnbTree,
    DevLnbDrawer,
  },

  setup() {
    return {
      ...useLnbExpand(),
    };
  },
};
</script>
