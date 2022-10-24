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
import { LocalDataProvider, GridView } from 'realgrid';
import useCreateGrid, { useCreateGridProps } from './private/useCreateGrid';

export default {
  name: 'KwGrid',

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
