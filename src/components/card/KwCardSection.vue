<template>
  <q-card-section
    class="kw-card-section"
    v-bind="styleClassAttrs"
    :tag="tag"
    :horizontal="horizontal"
  >
    <slot />
  </q-card-section>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCardSection',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    tag: { type: String, default: 'div' },
    horizontal: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
