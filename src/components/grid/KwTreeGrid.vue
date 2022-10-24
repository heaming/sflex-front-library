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
  </div>
</template>

<script>
import { LocalTreeDataProvider, TreeView } from 'realgrid';
import useCreateGrid, { useCreateGridProps } from './private/useCreateGrid';

export default {
  name: 'KwTreeGrid',

  props: {
    ...useCreateGridProps,
  },

  setup() {
    return {
      ...useCreateGrid(LocalTreeDataProvider, TreeView),
    };
  },
};
</script>
