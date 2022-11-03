<template>
  <kw-btn
    class="dev-lnb-drawer"
    :class="{'dev-lnb-drawer--expanded': isExpanded}"
    icon="lnb_arrow"
    borderless
    @click="toggleExpanded"
  />
</template>

<script>
import useLnbExpand from '../../composables/private/useLnbExpand';

export default {
  name: 'DevLnbDrawer',

  setup() {
    return {
      ...useLnbExpand(),
    };
  },
};
</script>
