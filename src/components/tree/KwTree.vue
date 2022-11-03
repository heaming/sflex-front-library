<template>
  <q-tree
    ref="treeRef"
    class="kw-tree"
    :expanded="expanded"
    :selected="selected"
    :nodes="nodes"
    :node-key="nodeKey"
    :label-key="labelKey"
    :children-key="childrenKey"
    :no-nodes-label="noNodesLabel"
    :no-results-label="noResultsLabel"
    :no-selection-unset="noSelectionUnset"
    :default-expand-all="defaultExpandAll"
    :accordion="accordion"
    :duration="duration"
    :no-transition="noTransition"
    :no-connectors="noConnectors"
    :selected-color="selectedColor"
    :filter="filter"
    :filter-method="filterMethod"
    @update:expanded="onUpdateExpanded"
    @update:selected="onUpdateSelected"
  >
    <template #header="{node, ...slotProps}">
      <slot
        name="header"
        v-bind="slotProps"
        :node="node"
        :is-leaf="(node[childrenKey]?.length || 0) === 0"
      >
        {{ node[labelKey] }}
      </slot>
    </template>
    <template
      v-if="$slots.body"
      #body="slotProps"
    >
      <slot
        name="body"
        v-bind="slotProps"
      />
    </template>
  </q-tree>
</template>

<script>

export default {
  name: 'KwTree',
  inheritAttrs: false,

  props: {
    // fall through props
    expanded: { type: Array, default: undefined },
    selected: { type: String, default: undefined },
    nodes: { type: Array, default: () => [] },
    nodeKey: { type: String, default: 'key' },
    labelKey: { type: String, default: 'label' },
    childrenKey: { type: String, default: 'children' },
    noNodesLabel: { type: String, default: undefined },
    noResultsLabel: { type: String, default: undefined },
    noSelectionUnset: { type: Boolean, default: true },
    defaultExpandAll: { type: Boolean, default: false },
    accordion: { type: Boolean, default: false },
    duration: { type: Number, default: 100 },
    noTransition: { type: Boolean, default: false },
    noConnectors: { type: Boolean, default: false },
    selectedColor: { type: String, default: 'primary' },
    filter: { type: String, default: undefined },
    filterMethod: { type: Function, default: undefined },

    // customize props
    selectLeafOnly: { type: Boolean, default: false },
  },

  emits: [
    'update:expanded',
    'update:selected',
  ],

  setup(props, { emit }) {
    const treeRef = ref();

    function getNodeByKey(key) {
      return treeRef.value.getNodeByKey(key);
    }

    function getExpandedNodes() {
      return treeRef.value.getExpandedNodes();
    }

    function isExpanded(key) {
      return treeRef.value.isExpanded(key);
    }

    function isLeaf(key) {
      const node = getNodeByKey(key);
      return node !== undefined && (node[props.childrenKey]?.length || 0) === 0;
    }

    function expandAll() {
      treeRef.value.expandAll();
    }

    function collapseAll() {
      treeRef.value.collapseAll();
    }

    function setExpanded(key, state) {
      treeRef.value.setExpanded(key, state);
    }

    function onUpdateExpanded(expanded) {
      emit('update:expanded', expanded);
    }

    function onUpdateSelected(key) {
      const shouldSelect = isLeaf(key) || props.selectLeafOnly === false;

      if (shouldSelect) {
        emit('update:selected', key);
      } else {
        setExpanded(key, !isExpanded(key));
      }
    }

    return {
      treeRef,
      getNodeByKey,
      getExpandedNodes,
      isExpanded,
      isLeaf,
      expandAll,
      collapseAll,
      setExpanded,
      onUpdateExpanded,
      onUpdateSelected,
    };
  },
};
</script>
