<template>
  <div class="mobile-left-drawer__title">
    <div>
      <slot>
        <h1>{{ title }}</h1>
      </slot>
    </div>

    <kw-icon
      class="mobile-left-drawer__btn"
      name="arrow_prev"
      size="16px"
      clickable
      @click="setExpanded(false)"
    />
  </div>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

export default {
  name: 'MobileLeftDrawerTitle',

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
