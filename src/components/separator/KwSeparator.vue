<template>
  <q-separator
    class="kw-separator"
    v-bind="styleClassAttrs"
    :spaced="spaced"
    :vertical="vertical"
    :size="size"
    :color="color"
  />
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwSeparator',
  inheritAttrs: false,

  props: {
    spaced: { type: [Boolean, String], default: '30px' },
    vertical: { type: Boolean, default: false },
    size: { type: String, default: undefined },
    color: { type: String, default: 'grey-5' }, // can be transparent
  },

  setup() {
    return {
      ...useInheritAttrs(),
    };
  },
};
</script>
