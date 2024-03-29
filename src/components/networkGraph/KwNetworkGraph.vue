<template>
  <v-network-graph
    ref="networkGraph"
    :nodes="nodes"
    :edges="edges"
    :paths="paths"
    :layouts="layouts"
    :selected-nodes="selectedNodes"
    :selected-edges="selectedEdges"
    :selected-paths="selectedPaths"
    :zoom-level="zoomLevel"
    :configs="computedConfigs"
    :layers="layers"
    :event-handlers="eventHandlers"
    @update:zoom-level="onUpdateZoomLevel"
    @update:selected-nodes="onUpdateSelectedNodes"
    @update:selected-edges="onUpdateSelectedEdges"
    @update:selected-paths="onUpdateSelectedPaths"
    @update:layouts="onUpdateLayouts"
  />
</template>

<script>
import { VNetworkGraph, defineConfigs } from 'v-network-graph';
import 'v-network-graph/lib/style.css';

export default {
  name: 'KwNetworkGraph',
  components: { VNetworkGraph },
  inheritAttrs: false,
  props: {
    nodes: { type: Object, default: () => {} },
    edges: { type: Object, default: () => {} },
    paths: { type: Object, default: () => {} },
    layouts: { type: Object, default: () => {} },
    selectedNodes: { type: Array, default: () => [] },
    selectedEdges: { type: Array, default: () => [] },
    selectedPaths: { type: Array, default: () => [] },
    zoomLevel: { type: Number, default: 1.0 },
    configs: { type: Object, default: () => null },
    layers: { type: Object, default: () => {} },
    eventHandlers: { type: Object, default: () => {} },
    onUpdateZoomLevel: { type: Function, default: undefined },
    onUpdateSelectedNodes: { type: Function, default: undefined },
    onUpdateSelectedEdges: { type: Function, default: undefined },
    onUpdateSelectedPaths: { type: Function, default: undefined },
    onUpdateLayouts: { type: Function, default: undefined },
  },
  setup(props) {
    const computedConfigs = ref(null);
    const networkGraph = ref();
    if (props.configs) {
      computedConfigs.value = defineConfigs(props.configs);
    }

    const getNetworkGraph = () => networkGraph?.value;
    return {
      computedConfigs,
      networkGraph,
      getNetworkGraph,
    };
  },
};
</script>
