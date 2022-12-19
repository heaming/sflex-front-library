<template>
  <q-card
    class="kw-card"
    v-bind="styleClassAttrs"
    :tag="tag"
    :dark="dark"
    :square="square"
    :flat="flat"
    :bordered="bordered"
    @click="$emit('click', $event)"
  >
    <slot />
  </q-card>
</template>

<script>

import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCard',
  inheritAttrs: false,

  props: {
    // customize props

    // fall through props
    tag: { type: String, default: 'div' },
    dark: { type: Boolean, default: undefined },
    square: { type: Boolean, default: undefined },
    flat: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
  },
  emits: [
    'click',
  ],

  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
