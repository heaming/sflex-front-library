<template>
  <q-card-actions
    class="kw-card-actions"
    v-bind="styleClassAttrs"
    :align="align"
    :vertical="vertical"
  >
    <slot />
  </q-card-actions>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCardActions',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    align: { type: String, default: 'left' },
    vertical: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
