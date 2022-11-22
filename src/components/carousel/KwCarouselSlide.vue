<template>
  <q-carousel-slide
    v-bind="styleClassAttrs"
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
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCarouselSlide',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    name: { type: [Object, Array, Number, String, Boolean, Function], required: true },
    imgSrc: { type: String, default: undefined },
    disable: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
