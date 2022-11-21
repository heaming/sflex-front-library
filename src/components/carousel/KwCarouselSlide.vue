<template>
  <q-carousel-slide
    class="kw-carousel-slide"
    :name="name"
    :img-src="imgSrc"
    :disable="disable"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
  </q-carousel-slide>
</template>

<script>
export default {
  name: 'KwCarouselSlide',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    name: { type: [Object, String, Number, Array, Boolean], required: true },
    imgSrc: { type: String, default: undefined },
    disable: { type: Boolean, default: undefined },
  },
};
</script>
