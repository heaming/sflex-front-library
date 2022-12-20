<template>
  <div
    class="kw-grid"
    :style="{ height: resizedHeight }"
  >
    <div
      ref="containerRef"
      class="rg-container"
    />
    <q-resize-observer
      :debounce="100"
      @resize="onResize"
    />
    <context-menu
      ref="contextMenuRef"
    />
  </div>
</template>

<script>
import { LocalDataProvider, GridView } from 'realgrid';
import useCreateGrid, { useCreateGridProps } from './private/useCreateGrid';
import ContextMenu from './ContextMenu.vue';

export default {
  name: 'KwGrid',
  components: { ContextMenu },

  props: {
    ...useCreateGridProps,
  },

  setup() {
    return {
      ...useCreateGrid(LocalDataProvider, GridView),
    };
  },
};
</script>
