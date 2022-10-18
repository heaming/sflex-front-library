<template>
  <kw-btn
    class="app-lnb-drawer"
    :class="{'app-lnb-drawer--expanded': isExpanded}"
    icon="lnb_arrow"
    borderless
    @click="toggleExapnded()"
  />
</template>

<script>
import useLnbExpand from './private/useLnbExpand';

export default {
  name: 'AppLnbDrawer',

  setup() {
    return {
      ...useLnbExpand(),
    };
  },
};
</script>
