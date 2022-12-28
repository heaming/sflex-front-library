<template>
  <div
    class="web-tab-view__panels q-tab-panels q-panel-parent"
  >
    <keep-alive
      v-for="panel of panels"
      :key="panel.props.name"
    >
      <component
        :is="panel"
        v-if="isActivePanel(panel)"
      />
    </keep-alive>
  </div>
</template>

<script>
import usePanels, { usePanelsProps, usePanelsEmits } from '../../composables/private/usePanels';

export default {
  name: 'WebTabViewPanels',

  props: {
    ...usePanelsProps,
  },

  emits: [
    ...usePanelsEmits,
  ],

  setup() {
    return {
      ...usePanels('WebTabViewPanel'),
    };
  },
};
</script>
