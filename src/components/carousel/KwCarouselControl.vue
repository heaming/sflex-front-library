<template>
  <q-carousel-control
    class="kw-carousel-control"
    v-bind="styleClassAttrs"
    :position="position"
    :offset="offset"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
  </q-carousel-control>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCarouselControl',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    position: { type: String, default: 'top' },
    offset: { type: Array, default: () => [0, 0] },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
