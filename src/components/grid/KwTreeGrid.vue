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
      debounce="100"
      @resize="onResize"
    />
  </div>
</template>

<script>
import { LocalTreeDataProvider, TreeView } from 'realgrid';
import useCreateGrid, { useCreateGridProps, useCreateGridEmits } from './private/useCreateGrid';
import useResizeGrid, { useResizeGridProps } from './private/useResizeGrid';

export default {
  name: 'KwTreeGrid',

  props: {
    ...useCreateGridProps,
    ...useResizeGridProps,
  },

  emits: [
    ...useCreateGridEmits,
  ],

  setup() {
    return {
      ...useCreateGrid(LocalTreeDataProvider, TreeView),
      ...useResizeGrid(),
    };
  },
};
</script>
