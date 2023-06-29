<template>
  <q-tooltip
    class="kw-tooltip"
    v-bind="styleClassAttrs"
    :model-value="value"
    :scroll-target="scrollTarget"
    :target="target"
    :delay="delay"
    :hide-delay="hideDelay"
    :no-parent-event="noParentEvent"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    :transition-duration="0"
    @update:model-value="onUpdateValue"
    @before-show="$emit('beforeShow', $event)"
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
    // custom props
    showWhenEllipsised: { type: Boolean, default: false },

    // fallthrough props
    modelValue: { type: Boolean, default: undefined },
    scrollTarget: { type: [Element, String], default: undefined },
    target: { type: [Boolean, String], default: undefined },
    noParentEvent: { type: Boolean, default: false },
    delay: { type: Number, default: 100 },
    hideDelay: { type: Number, default: 0 },
    maxHeight: { type: String, default: undefined },
    maxWidth: { type: String, default: undefined },
    anchor: { type: String, default: undefined },
    self: { type: String, default: undefined },
    offset: { type: Array, default: undefined },
  },

  emits: [
    'update:modelValue',
    'beforeShow',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();

    const getParentEl = () => vm.proxy.$el.parentElement;
    const isEllipsised = () => getParentEl()?.scrollWidth > getParentEl()?.offsetWidth;
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
