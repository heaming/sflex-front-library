<template>
  <q-step
    :name="name"
    :disable="disable"
    :icon="icon"
    :color="color"
    :title="title"
    :caption="caption"
    :prefix="prefix"
    :active-icon="activeIcon"
    :active-color="activeColor"
    :done-icon="doneIcon"
    :done-color="doneColor"
    :error-icon="errorIcon"
    :error-color="errorColor"
    :done="done"
    :error="error"
    :header-nav="headerNav"
  >
    <slot />
  </q-step>
</template>

<script>

export default {
  name: 'KwStep',
  inheritAttrs: false,

  props: {
    // customize props
    headingText: { type: String, default: undefined },
    subText: { type: String, default: undefined },
    tooltip: { type: String, default: undefined },

    // fall through props
    name: { type: [String, Number], default: undefined },
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
    done: { type: Boolean, default: undefined },
    error: { type: Boolean, default: undefined },
    headerNav: { type: Boolean, default: true },
  },

  setup() {
    return {

    };
  },

};
</script>
