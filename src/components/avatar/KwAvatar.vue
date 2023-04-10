<template>
  <q-avatar
    :class="avatarClass"
    :size="size"
    v-bind="styleClassAttrs"
    :font-size="fontSize"
    :color="color"
    :text-color="textColor"
    :icon="icon"
    :square="square"
    :rounded="rounded"
  >
    <slot />
  </q-avatar>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwAvatar',
  inheritAttrs: false,
  props: {
    // customize props
    borderColor: {
      type: String,
      default: undefined,
    },

    // fall through props
    size: {
      type: String,
      default: undefined,
    },
    fontSize: {
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
    icon: {
      type: String,
      default: undefined,
    },
    square: {
      type: Boolean,
      default: undefined,
    },
    rounded: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props) {
    const avatarRef = ref();
    const { styleClassAttrs } = useInheritAttrs();
    const avatarClass = computed(() => {
      const classes = { 'kw-avatar': true };
      if (props.borderColor) { classes[`kw-avatar--border-color-${props.borderColor}`] = true; }
      return classes;
    });
    return {
      avatarRef,
      styleClassAttrs,
      avatarClass,
    };
  },
};
</script>
