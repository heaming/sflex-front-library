<template>
  <q-step
    class="kw-step"
    v-bind="styleClassAttrs"
    :name="name"
    :disable="disable"
    :icon="icon"
    :color="color"
    :title="title"
    :caption="caption"
    :prefix="prefix"
    :done-icon="doneIcon"
    :done-color="doneColor"
    :active-icon="activeIcon"
    :active-color="activeColor"
    :error-icon="errorIcon"
    :error-color="errorColor"
    :header-nav="headerNav"
    :done="done"
    :error="error"
  >
    <slot />
  </q-step>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwStep',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    name: { type: String, required: true },
    disable: { type: Boolean, default: undefined },
    icon: { type: String, default: undefined },
    color: { type: String, default: undefined },
    title: { type: [String, Number], required: true },
    caption: { type: String, default: undefined },
    prefix: { type: [String, Number], default: undefined },
    doneIcon: { type: String, default: undefined },
    doneColor: { type: String, default: undefined },
    activeIcon: { type: String, default: undefined },
    activeColor: { type: String, default: undefined },
    errorIcon: { type: String, default: undefined },
    errorColor: { type: String, default: undefined },
    headerNav: { type: Boolean, default: true },
    done: { type: Boolean, default: undefined },
    error: { type: Boolean, default: undefined },
  },
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },

};
</script>
