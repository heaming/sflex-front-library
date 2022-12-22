<template>
  <div
    v-touch-swipe.mouse="onSwipe"
    class="kw-tab-panels q-tab-panels q-panel-parent"
    v-bind="styleClassAttrs"
  >
    <transition
      v-for="panel of panels"
      :key="panel.props.name"
      v-bind="panelTransition"
    >
      <keep-alive>
        <component
          :is="panel"
          v-if="isActivePanel(panel)"
          @touchstart="onBeforeSwipe"
          @mousedown="onBeforeSwipe"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import usePanels, { usePanelsProps, usePanelsEmits } from '../../composables/private/usePanels';

export default {
  name: 'KwTabPanels',
  inheritAttrs: false,

  props: {
    ...usePanelsProps,
  },

  emits: [
    ...usePanelsEmits,
  ],

  setup() {
    return {
      ...useInheritAttrs(),
      ...usePanels('KwTabPanel'),
    };
  },
};
</script>
