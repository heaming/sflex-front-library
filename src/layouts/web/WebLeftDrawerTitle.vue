<template>
  <div class="web-left-drawer__title">
    <div class="flex items-center">
      <slot>
        {{ title }}
      </slot>
    </div>

    <kw-icon
      class="web-left-drawer__btn"
      name="arrow_prev_lnb"
      size="16px"
      clickable
      @click="setExpanded(false)"
    />
  </div>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

export default {
  name: 'WebLeftDrawerTitle',

  props: {
    title: {
      type: String,
      default: undefined,
    },
  },

  setup() {
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
