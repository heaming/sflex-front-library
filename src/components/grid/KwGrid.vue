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
      v-if="needContextMenu"
      ref="contextMenuRef"
    />
  </div>
</template>

<script>
import { LocalDataProvider, GridView } from 'realgrid';
import useCreate, { useCreateProps } from './private/useCreate';
import ContextMenu from './ContextMenu.vue';

export default {
  name: 'KwGrid',
  components: { ContextMenu },

  props: {
    needContextMenu: { type: Boolean, default: true },
    ...useCreateProps,
  },

  setup() {
    return {
      ...useCreate(LocalDataProvider, GridView),
    };
  },
};
</script>
