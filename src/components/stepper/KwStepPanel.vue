<template>
  <div class="q-panel scroll">
    <div
      ref="containerRef"
      tabindex="-1"
      class="kw-step-panel"
      :class="{'kw-step-panel--disabled': !!disable}"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import usePanel, { usePanelProps } from '../../composables/private/usePanel';

export default {
  name: 'KwStepPanel',

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
