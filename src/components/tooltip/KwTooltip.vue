<template>
  <q-tooltip
    class="kw-tooltip"
    v-bind="styleClassAttrs"
    :model-value="value"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    @update:model-value="onUpdateValue"
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
    maxHeight: {
      type: String,
      default: undefined,
    },
    maxWidth: {
      type: String,
      default: undefined,
    },
    anchor: {
      type: String,
      default: undefined,
    },
    self: {
      type: String,
      default: undefined,
    },
    offset: {
      type: Array,
      default: undefined,
    },
    showWhenEllipsised: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();

    const getParentEl = () => vm.proxy.$el.parentElement;
    const isEllipsised = () => getParentEl().scrollWidth > getParentEl().offsetWidth;
    const isShowable = () => (props.showWhenEllipsised ? isEllipsised() : true);

    const value = ref(false);

    function onUpdateValue(val) {
      if (!val || isShowable()) value.value = val;
    }

    watch(value, (val) => emit('update:modelValue', val));
    watch(() => props.modelValue, onUpdateValue);

    return {
      ...useInheritAttrs(),
      value,
      onUpdateValue,
    };
  },
};
</script>
