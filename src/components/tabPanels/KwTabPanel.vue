<template>
  <q-tab-panel
    class="kw-tab-panel"
  >
    <slot />
  </q-tab-panel>
</template>

<script>
import usePageSearch from '../../composables/private/usePageSearch';

export default {
  name: 'KwTabPanel',

  setup() {
    usePageSearch();
  },
};
</script>
