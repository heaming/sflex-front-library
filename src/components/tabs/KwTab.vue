<template>
  <q-tab
    class="kw-tab"
    v-bind="styleClassAttrs"
    :name="name"
    :label="label"
    :disable="disable"
    :tabindex="tabindex"
    :ripple="false"
    no-caps
  >
    <slot />
  </q-tab>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTab',
  inheritAttrs: false,

  props: {
    name: {
      type: [Number, String],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [Number, String],
      default: undefined,
    },
  },

  setup() {
    return {
      ...useInheritAttrs(),
    };
  },
};
</script>
