<template>
  <q-tree
    ref="treeRef"
    v-bind="styleClassAttrs"
    :class="treeClass"
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
    <template #default-header="{node, ...slotProps}">
      <div
        v-if="draggable"
        :data-key="node[nodeKey]"
        class="hidden"
      />
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
      #default-body="slotProps"
    >
      <slot
        name="body"
        v-bind="slotProps"
      />
    </template>
  </q-tree>
</template>

<script>
import Sortable from 'sortablejs';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

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
    draggable: { type: Boolean, default: false },
    onDragMove: { type: Function, default: undefined },
    onDragUpdate: { type: Function, default: undefined },
  },

  emits: [
    'update:expanded',
    'update:selected',
  ],

  setup(props, { emit }) {
    const treeRef = ref();
    const treeClass = computed(() => ({
      'kw-tree': true,
      'kw-tree--empty': props.nodes.length === 0,
    }));

    function getNodeByKey(key) {
      return treeRef.value.getNodeByKey(key);
    }

    function getNodeByElement(el) {
      const target = el.querySelector('.q-tree__node-header-content > div');
      return getNodeByKey(target?.getAttribute('data-key'));
    }

    function getElementByKey(key) {
      const el = treeRef.value.$el;
      return el.querySelector(`.q-tree__node:has(> .q-tree__node-header > .q-tree__node-header-content > div[data-key="${key}"])`);
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
      const shouldUpdate = !key || isLeaf(key) || props.selectLeafOnly === false;

      if (shouldUpdate) {
        emit('update:selected', key);
      } else {
        setExpanded(key, !isExpanded(key));
      }
    }

    let sortableInstances = [];

    function getSortableTargets(el) {
      const targets = [el];
      // eslint-disable-next-line no-restricted-syntax
      for (const child of el.children) {
        const next = child.querySelector('.q-tree__children');
        if (next) {
          targets.push(
            ...getSortableTargets(next),
          );
        }
      }
      return targets;
    }

    function destroySortable() {
      sortableInstances.forEach((e) => { e.destroy(); });
      sortableInstances = [];
    }

    function createSortable() {
      destroySortable();

      const el = treeRef.value.$el;
      const targets = getSortableTargets(el);

      let updateCustomEvt;
      targets.forEach((e) => {
        sortableInstances.push(
          new Sortable(e, {
            group: 'nested',
            swapThreshold: 0.5,
            animation: 150,
            onMove(evt) {
              const sourceNode = getNodeByElement(evt.dragged);
              const targetNode = getNodeByElement(evt.related);

              const moveCustomEvt = {
                sourceNode,
                targetNode,
              };

              if (props.onDragMove?.(moveCustomEvt, evt) === false) {
                return false;
              }

              // wait tick for render
              setTimeout(() => {
                const { nodeKey } = props;

                updateCustomEvt = {
                  source: getElementByKey(sourceNode[nodeKey]),
                  sourceNode,
                  target: getElementByKey(targetNode[nodeKey]),
                  targetNode,
                };
              });
            },
            onEnd(evt) {
              if (updateCustomEvt) {
                props.onDragUpdate?.(updateCustomEvt, evt);
                updateCustomEvt = undefined;
              }
            },
          }),
        );
      });
    }

    let unwatchNodes;
    function watchNodes() {
      unwatchNodes = watch(() => props.nodes, async () => {
        await nextTick();
        createSortable();
      });
    }

    onMounted(() => {
      watch(() => props.draggable, (val) => {
        if (val) {
          createSortable();
          watchNodes();
        } else {
          destroySortable();
          unwatchNodes?.();
        }
      }, { immediate: true });
    });

    onBeforeUnmount(() => {
      if (props.draggable) {
        destroySortable();
      }
    });

    return {
      ...useInheritAttrs(),
      treeRef,
      treeClass,
      getNodeByKey,
      getNodeByElement,
      getElementByKey,
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
