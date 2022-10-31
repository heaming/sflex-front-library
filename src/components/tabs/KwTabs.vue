<template>
  <q-tabs
    class="kw-tabs"
    :class="tabsClass"
    v-bind="styleClassAttrs"
    :model-value="modelValue"
    :align="align"
    @update:model-value="$emit('update:modelValue', $event)"
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
    dense: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props) {
    const tabsClass = computed(() => ({
      'kw-tabs--dense': props.dense,
    }));

    return {
      ...useInheritAttrs(),
      tabsClass,
    };
  },
};
</script>
