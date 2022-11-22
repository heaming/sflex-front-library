<template>
  <q-card
    class="kw-card"
    :tag="tag"
    :dark="dark"
    :square="square"
    :flat="flat"
    :bordered="bordered"
  >
    <slot />
  </q-card>
</template>

<script>

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
};
</script>
