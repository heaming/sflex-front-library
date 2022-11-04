<template>
  <q-icon
    class="kw-icon"
    :class="iconClass"
    v-bind="styleClassAttrs"
    :name="name"
    :size="size"
    :color="color"
    @click="!disable && onClick?.($event)"
  >
    <kw-tooltip
      v-if="hasContent"
      :anchor="tooltipAnchor"
      :self="tooltipSelf"
      :offset="tooltipOffset"
    >
      <slot>
        {{ tooltip }}
      </slot>
    </kw-tooltip>
  </q-icon>
</template>

<script>
import { isNil } from 'lodash-es';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwIcon',
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: [Number, String],
      default: undefined,
    },
    tooltipAnchor: {
      type: String,
      default: undefined,
    },
    tooltipSelf: {
      type: String,
      default: undefined,
    },
    tooltipOffset: {
      type: Array,
      default: undefined,
    },
    onClick: {
      type: Function,
      default: undefined,
    },
  },

  setup(props) {
    const iconClass = computed(() => [
      props.clickable && 'cursor-pointer',
      props.disable && 'disabled',
    ]);

    const slots = useSlots();
    const hasContent = computed(() => !isNil(props.tooltip || slots.default));

    return {
      ...useInheritAttrs(),
      iconClass,
      hasContent,
    };
  },
};

</script>
