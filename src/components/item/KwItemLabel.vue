<template>
  <q-item-label
    v-bind="styleClassAttrs"
    class="kw-item__label"
    :class="fontClass"
    :style="fontStyle"
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
import useFont, { useFontProps } from '../../composables/private/useFont';

export default {
  name: 'KwItemLabel',
  inheritAttrs: false,
  props: {
    // customize props
    ...useFontProps,

    // fall through props
    lines: { type: [Number, String], default: undefined },
    overline: { type: Boolean, default: undefined },
    caption: { type: Boolean, default: undefined },
    header: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();
    const { fontClass, fontStyle } = useFont(true);

    return {
      styleClassAttrs,
      fontClass,
      fontStyle,
    };
  },
};
</script>
