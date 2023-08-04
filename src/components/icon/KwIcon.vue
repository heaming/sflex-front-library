<template>
  <q-icon
    class="kw-icon"
    :class="iconClass"
    v-bind="styleClassAttrs"
    :name="name"
    :size="size"
    :color="color"
    @click="onClickIcon"
  >
    <kw-click-outside
      @click-outside="showingHint = false"
    >
      <template v-if="$g.platform.is.desktop">
        <kw-tooltip
          v-if="hasContent"
          :anchor="tooltipAnchor"
          :self="tooltipSelf"
          :class="tooltipClass"
          :offset="tooltipOffset"
        >
          <slot>
            {{ tooltip }}
          </slot>
        </kw-tooltip>
      </template>
      <template v-else>
        <kw-tooltip
          v-if="hasContent"
          v-model="showingHint"
          :anchor="tooltipAnchor"
          :self="tooltipSelf"
          :class="tooltipClass"
          :offset="tooltipOffset"
        >
          <slot>
            {{ tooltip }}
          </slot>
        </kw-tooltip>
      </template>
    </kw-click-outside>
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
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [0, 3],
    },
    tooltipClass: {
      type: String,
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
    const showingHint = ref(false);
    function onClickIcon(e) {
      if (!props.disable && props.onClick) {
        props.onClick(e);
      }
      showingHint.value = !showingHint.value;
    }

    return {
      ...useInheritAttrs(),
      iconClass,
      hasContent,
      showingHint,
      onClickIcon,
    };
  },
};

</script>
