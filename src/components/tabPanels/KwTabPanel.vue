<template>
  <div class="q-panel scroll">
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
import { usePanelChildProps } from './private/usePanel';
import usePageSearch from '../../composables/private/usePageSearch';
import { stopAndPrevent } from '../../utils/private/event';
import { addFocusout, removeFocusout } from '../../utils/private/focusout';

export default {
  name: 'KwTabPanel',

  props: {
    ...usePanelChildProps,
  },

  setup(props) {
    usePageSearch();

    const containerRef = ref();

    function onFocusChange(evt) {
      if (evt.target !== containerRef.value
        && containerRef.value.contains(evt.target)) {
        stopAndPrevent(evt);
        containerRef.value.focus();
      }
    }

    watch(() => props.disable, (val) => {
      if (val) {
        addFocusout(onFocusChange);
      } else {
        removeFocusout(onFocusChange);
      }
    });

    onBeforeUnmount(() => {
      if (props.disable) {
        removeFocusout(onFocusChange);
      }
    });

    return {
      containerRef,
    };
  },
};
</script>
