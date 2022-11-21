<template>
  <q-card-section
    :tag="tag"
    :horizontal="horizontal"
    class="kw-card-section"
  >
    <slot />
  </q-card-section>
</template>

<script>
export default {
  name: 'KwCardSection',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    tag: { type: String, default: 'div' },
    horizontal: { type: Boolean, default: undefined },
  },
};
</script>
