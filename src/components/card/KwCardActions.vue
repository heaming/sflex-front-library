<template>
  <q-card-actions
    class="kw-card-actions"
    :align="align"
    :vertical="vertical"
  >
    <slot />
  </q-card-actions>
</template>

<script>
export default {
  name: 'KwCardActions',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    align: { type: String, default: 'left' },
    vertical: { type: Boolean, default: undefined },
  },
};
</script>
