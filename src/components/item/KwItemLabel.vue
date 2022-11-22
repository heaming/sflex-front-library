<template>
  <q-item-label
    v-bind="styleClassAttrs"
    class="kw-item-label"
    :lines="lines"
    :overline="overline"
    :caption="caption"
    :header="header"
  >
    <slot />
  </q-item-label>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwItemLabel',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    lines: { type: [Number, String], default: undefined },
    overline: { type: Boolean, default: undefined },
    caption: { type: Boolean, default: undefined },
    header: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
