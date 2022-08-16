<template>
  <div
    class="kw-grid"
    :style="{ height: resizedHeight }"
  >
    <div ref="containerRef" />
    <q-resize-observer
      :debounce="100"
      @resize="onResize"
    />
  </div>
</template>

<script>
import { LocalTreeDataProvider, TreeView } from 'realgrid';
import useCreateGrid, { useCreateGridProps } from './private/useCreateGrid';
import useResizeGrid, { useResizeGridProps } from './private/useResizeGrid';

export default {
  name: 'KwTreeGrid',

  props: {
    ...useCreateGridProps,
    ...useResizeGridProps,
  },

  setup() {
    return {
      ...useCreateGrid(LocalTreeDataProvider, TreeView),
      ...useResizeGrid(),
    };
  },
};
</script>
