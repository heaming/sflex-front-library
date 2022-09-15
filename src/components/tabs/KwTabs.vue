<template>
  <q-tabs
    class="kw-tabs"
    v-bind="styleClassAttrs"
    :model-value="modelValue"
    :align="align"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </q-tabs>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTabs',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [Number, String],
      default: undefined,
    },
    align: {
      type: String,
      default: 'left',
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
