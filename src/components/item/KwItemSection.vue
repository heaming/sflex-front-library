<template>
  <q-item-section
    v-bind="styleClassAttrs"
    class="kw-item__section"
    :avatar="avatar"
    :thumbnail="thumbnail"
    :side="side"
    :top="top"
    :no-wrap="noWrap"
  >
    <slot />
  </q-item-section>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwItemSection',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    avatar: { type: Boolean, default: undefined },
    thumbnail: { type: Boolean, default: undefined },
    side: { type: Boolean, default: undefined },
    top: { type: Boolean, default: undefined },
    noWrap: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
