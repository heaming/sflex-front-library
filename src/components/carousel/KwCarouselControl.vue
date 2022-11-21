<template>
  <q-carousel-control
    class="kw-carousel-control"
    :position="position"
    :offset="offset"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
  </q-carousel-control>
</template>

<script>
export default {
  name: 'KwCarouselControl',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    position: { type: String, default: undefined },
    offset: { type: Array, default: undefined },
  },
};
</script>
