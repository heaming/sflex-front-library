<template>
  <q-chip
    class="kw-chip"
    :class="chipClass"
    v-bind="styleClassAttrs"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    icon-remove="close"
    :color="color"
    :text-color="textColor"
    :disable="disable"
    :ripple="false"
    :outline="outline"
    :square="square"
    :removable="removable"
    @click="onClick"
  >
    <slot />
  </q-chip>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwChip',
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconRight: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    textColor: {
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
    onClick: {
      type: Function,
      default: undefined,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    removable: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const chipClass = computed(() => [
      props.clickable && 'cursor-pointer',
    ]);

    return {
      ...useInheritAttrs(),
      chipClass,
    };
  },
};
</script>
