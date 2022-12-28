<template>
  <div class="q-panel">
    <div
      ref="containerRef"
      tabindex="-1"
      class="web-tab-view__panel"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import usePanel, { usePanelProps } from '../../composables/private/usePanel';

export default {
  name: 'WebTabViewPanel',

  props: {
    ...usePanelProps,
  },

  setup() {
    return {
      ...usePanel(),
    };
  },
};
</script>
