<template>
  <kw-btn
    class="web-lnb-drawer"
    :class="{'web-lnb-drawer--expanded': isExpanded}"
    icon="lnb_arrow"
    borderless
    @click="toggleExpanded"
  />
</template>

<script>
import useLnbExpand from '../../composables/private/useLnbExpand';

export default {
  name: 'WebLnbDrawer',

  setup() {
    return {
      ...useLnbExpand(),
    };
  },
};
</script>
