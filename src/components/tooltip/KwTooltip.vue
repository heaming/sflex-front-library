<template>
  <q-tooltip
    class="kw-tooltip"
    v-bind="styleClassAttrs"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </q-tooltip>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTooltip',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    onUpdateModelValue: {
      type: Function,
      default: undefined,
    },
  },

  setup() {
    return {
      ...useInheritAttrs(),
    };
  },
};
</script>
