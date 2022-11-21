<template>
  <q-carousel
    ref="quasarRef"
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
export default {
  name: 'KwCarousel',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    fullscreen: { type: Boolean, default: undefined },
    noRouteFullscreenExit: { type: Boolean, default: undefined },
    keepAlive: { type: Boolean, default: undefined },
    keepAliveInclude: { type: [String, Array], default: undefined },
    keepAliveExclude: { type: [String, Array], default: undefined },
    keepAliveMax: { type: Number, default: undefined },
    animated: { type: Boolean, default: undefined },
    infinite: { type: Boolean, default: undefined },
    swipeable: { type: Boolean, default: undefined },
    vertical: { type: Boolean, default: undefined },
    autoplay: { type: [Number, Boolean], default: undefined },
    padding: { type: Boolean, default: undefined },
    arrows: { type: Boolean, default: undefined },
    prevIcon: { type: String, default: undefined },
    nextIcon: { type: String, default: undefined },
    navigation: { type: Boolean, default: undefined },
    navigationPosition: { type: String, default: undefined },
    navigationIcon: { type: String, default: undefined },
    navigationActiveIcon: { type: String, default: undefined },
    thumbnails: { type: Boolean, default: undefined },
    modelValue: { type: Boolean, default: undefined },
    dark: { type: Boolean, default: undefined },
    height: { type: String, default: undefined },
    controlColor: { type: String, default: undefined },
    controlTextColor: { type: String, default: undefined },
    controlType: { type: String, default: undefined },
    transitionPrev: { type: String, default: undefined },
    transitionNext: { type: String, default: undefined },
    transitionDuration: { type: [String, Number], default: undefined },
  },
  emits: ['update:model-value', 'before-transition', 'transition'],
  setup() {
    const quasarRef = ref();
    function toggleFullscreen(...args) { quasarRef.value?.getScrollTarget(...args); }
    function setFullscreen(...args) { quasarRef.value?.getScroll(...args); }
    function exitFullscreen(...args) { quasarRef.value?.getScrollPosition(...args); }
    function next(...args) { quasarRef.value?.getScrollPercentage(...args); }
    function previous(...args) { quasarRef.value?.setScrollPosition(...args); }
    function goTo(...args) { quasarRef.value?.setScrollPercentage(...args); }

    return {
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
