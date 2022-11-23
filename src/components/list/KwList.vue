<template>
  <q-list
    v-bind="styleClassAttrs"
    class="kw-list"
    :bordered="bordered"
    :dense="dense"
    :dark="dark"
    :padding="padding"
    :separator="separator"
  >
    <slot />
  </q-list>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwList',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    separator: { type: Boolean, default: undefined },
    padding: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    dense: { type: Boolean, default: undefined },
    dark: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
