<template>
  <q-carousel
    ref="quasarRef"
    v-bind="styleClassAttrs"
    class="kw-carousel"
    :fullscreen="fullscreen"
    :no-route-fullscreen-exit="noRouteFullscreenExit"
    :keep-alive="keepAlive"
    :keep-alive-include="keepAliveInclude"
    :keep-alive-exclude="keepAliveExclude"
    :keep-alive-max="keepAliveMax"
    :animated="animated"
    :infinite="infinite"
    :swipeable="swipeable"
    :vertical="vertical"
    :autoplay="autoplay"
    :padding="padding"
    :arrows="arrows"
    :prev-icon="prevIcon"
    :next-icon="nextIcon"
    :navigation="navigation"
    :navigation-position="navigationPosition"
    :navigation-icon="navigationIcon"
    :navigation-active-icon="navigationActiveIcon"
    :thumbnails="thumbnails"
    :model-value="modelValue"
    :dark="dark"
    :height="height"
    :control-color="controlColor"
    :control-text-color="controlTextColor"
    :control-type="controlType"
    :transition-prev="transitionPrev"
    :transition-next="transitionNext"
    :transition-duration="transitionDuration"
    @update:model-value="$emit('update:model-value', $event)"
    @before-transition="$emit('before-transition', $event)"
    @transition="$emit('transition', $event)"
  >
    <template
      v-if="$slots.default"
      #default
    >
      <slot />
    </template>
    <template
      v-if="$slots.control"
      #control
    >
      <slot name="control" />
    </template>
    <template
      v-if="$slots.navigationIcon"
      #navigation-icon="scoped"
    >
      <slot
        name="navigationIcon"
        v-bind="scoped"
      />
    </template>
  </q-carousel>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwCarousel',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    fullscreen: { type: Boolean, default: undefined },
    noRouteFullscreenExit: { type: Boolean, default: undefined },
    keepAlive: { type: Boolean, default: undefined },
    keepAliveInclude: { type: [String, Array, RegExp], default: undefined },
    keepAliveExclude: { type: [String, Array, RegExp], default: undefined },
    keepAliveMax: { type: Number, default: undefined },
    animated: { type: Boolean, default: undefined },
    infinite: { type: Boolean, default: undefined },
    swipeable: { type: Boolean, default: undefined },
    vertical: { type: Boolean, default: undefined },
    autoplay: { type: [Number, Boolean], default: false },
    padding: { type: Boolean, default: undefined },
    arrows: { type: Boolean, default: undefined },
    prevIcon: { type: String, default: 'arrow_left_24' },
    nextIcon: { type: String, default: 'arrow_right_24' },
    navigation: { type: Boolean, default: undefined },
    navigationPosition: { type: String, default: 'bottom/right' },
    navigationIcon: { type: String, default: undefined },
    navigationActiveIcon: { type: String, default: undefined },
    thumbnails: { type: Boolean, default: undefined },
    modelValue: { type: [Object, Array, Number, String, Boolean, Function], required: true },
    dark: { type: Boolean, default: undefined },
    height: { type: String, default: undefined },
    controlColor: { type: String, default: undefined },
    controlTextColor: { type: String, default: undefined },
    controlType: { type: String, default: undefined },
    transitionPrev: { type: String, default: 'fade' },
    transitionNext: { type: String, default: 'fade' },
    transitionDuration: { type: [String, Number], default: 300 },
  },
  emits: ['update:model-value', 'before-transition', 'transition'],
  setup() {
    const quasarRef = ref();
    function toggleFullscreen() { quasarRef.value?.toggleFullscreen(); }
    function setFullscreen() { quasarRef.value?.setFullscreen(); }
    function exitFullscreen() { quasarRef.value?.exitFullscreen(); }
    function next() { quasarRef.value?.next(); }
    function previous() { quasarRef.value?.previous(); }
    function goTo(panelName) { quasarRef.value?.goTo(panelName); }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      quasarRef,
      styleClassAttrs,
      toggleFullscreen,
      setFullscreen,
      exitFullscreen,
      next,
      previous,
      goTo,
    };
  },
};
</script>
