<template>
  <q-stepper
    ref="quasarRef"
    v-bind="styleClassAttrs"
    class="kw-stepper"
    :dark="dark"
    :model-value="modelValue"
    :keep-alive="keepAlive"
    :keep-alive-include="keepAliveInclude"
    :keep-alive-exclude="keepAliveExclude"
    :keep-alive-max="keepAliveMax"
    :animated="animated"
    :infinite="infinite"
    :swipeable="swipeable"
    :vertical="vertical"
    :transition-prev="transitionPrev"
    :transition-next="transitionNext"
    :transition-duration="transitionDuration"
    :flat="flat"
    :bordered="bordered"
    :alternative-labels="alternativeLabels"
    :header-nav="headerNav"
    :contracted="contracted"
    :header-class="headerClass"
    :inactive-color="inactiveColor"
    :inactive-icon="inactiveIcon"
    :done-icon="doneIcon"
    :done-color="doneColor"
    :active-icon="activeIcon"
    :active-color="activeColor"
    :error-icon="errorIcon"
    :error-color="errorColor"
    @update:model-value="$emit('update:modelValue', $event)"
    @before-transition="$emit('before-transition', $event)"
    @transition="$emit('transition', $event)"
  >
    <slot />

    <template #navigation>
      <slot name="navigation" />
    </template>

    <template #message>
      <slot name="message" />
    </template>
  </q-stepper>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwStepper',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    dark: { type: Boolean, default: undefined },
    modelValue: { type: [Object, Array, Number, String, Boolean, Function], required: true },
    keepAlive: { type: Boolean, default: true },
    keepAliveInclude: { type: [String, Array, RegExp], default: undefined },
    keepAliveExclude: { type: [String, Array, RegExp], default: undefined },
    keepAliveMax: { type: Number, default: undefined },
    animated: { type: Boolean, default: undefined },
    infinite: { type: Boolean, default: undefined },
    swipeable: { type: Boolean, default: undefined },
    vertical: { type: Boolean, default: undefined },
    transitionPrev: { type: String, default: 'fade' },
    transitionNext: { type: String, default: 'fade' },
    transitionDuration: { type: [String, Number], default: 0 },
    flat: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    alternativeLabels: { type: Boolean, default: undefined },
    headerNav: { type: Boolean, default: undefined },
    contracted: { type: Boolean, default: undefined },
    headerClass: { type: String, default: undefined },
    inactiveColor: { type: String, default: undefined },
    inactiveIcon: { type: String, default: undefined },
    doneIcon: { type: String, default: 'checked_stepper' },
    doneColor: { type: String, default: undefined },
    activeIcon: { type: String, default: 'none' },
    activeColor: { type: String, default: undefined },
    errorIcon: { type: String, default: undefined },
    errorColor: { type: String, default: undefined },
  },
  emits: [
    'update:modelValue',
    'before-transition',
    'transition',
  ],

  setup() {
    const quasarRef = ref();

    const { styleClassAttrs } = useInheritAttrs();

    function next() {
      quasarRef.value.next();
    }

    function previous() {
      quasarRef.value.previous();
    }

    function goTo() {
      quasarRef.value.goTo();
    }

    return {
      quasarRef,
      styleClassAttrs,
      next,
      previous,
      goTo,

    };
  },

};
</script>
