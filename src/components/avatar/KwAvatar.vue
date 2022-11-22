<template>
  <q-avatar
    :size="size"
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
    return {
      avatarRef,
    };
  },
};
</script>
