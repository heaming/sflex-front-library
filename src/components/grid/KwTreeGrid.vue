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
import { LocalTreeDataProvider, TreeView } from 'realgrid';
import useCreate, { useCreateProps } from './private/useCreate';
import ContextMenu from './ContextMenu.vue';

export default {
  name: 'KwTreeGrid',
  components: { ContextMenu },

  props: {
    ...useCreateProps,
  },

  setup() {
    return {
      ...useCreate(LocalTreeDataProvider, TreeView),
    };
  },
};
</script>
