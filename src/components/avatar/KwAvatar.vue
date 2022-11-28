<template>
  <q-avatar
    class="kw-avatar"
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
    // fall through props
    size: { type: String, default: undefined },
    fontSize: { type: String, default: undefined },
    color: { type: String, default: undefined },
    textColor: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    square: { type: Boolean, default: undefined },
    rounded: { type: Boolean, default: undefined },
  },
  setup() {
    const avatarRef = ref();
    const { styleClassAttrs } = useInheritAttrs();
    return {
      avatarRef,
      styleClassAttrs,
    };
  },
};
</script>
