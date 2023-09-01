<template>
  <div class="q-panel">
    <div
      ref="containerRef"
      tabindex="-1"
      class="kw-tab-panel"
      :class="{'kw-tab-panel--disabled': !!disable}"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import usePageSearch from '../../composables/private/usePageSearch';
import usePanel, { usePanelProps } from '../../composables/private/usePanel';

export default {
  name: 'KwTabPanel',

  props: {
    ...usePanelProps,
  },

  setup() {
    usePageSearch();

    return {
      ...usePanel(),
    };
  },
};
</script>
