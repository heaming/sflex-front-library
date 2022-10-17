<template>
  <div
    v-touch-swipe.mouse="onSwipe"
    class="kw-tab-panels q-tab-panels q-panel-parent"
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
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import usePanel, { usePanelProps, usePanelEmits } from './private/usePanel';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTabPanels',
  inheritAttrs: false,

  props: {
    ...usePanelProps,
  },

  emits: [
    ...usePanelEmits,
  ],

  setup() {
    return {
      ...usePanel(),
      ...useInheritAttrs(),
    };
  },
};
</script>
