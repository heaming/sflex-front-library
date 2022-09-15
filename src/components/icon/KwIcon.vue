<template>
  <q-icon
    class="kw-icon"
    :class="iconClass"
    v-bind="styleClassAttrs"
    :name="name"
    :size="size"
    :color="color"
    @click="!disable && onClick($event)"
  >
    <slot />
  </q-icon>
</template>

<script>
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

    return {
      ...useInheritAttrs(),
      iconClass,
    };
  },
};

</script>
