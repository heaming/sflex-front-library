<template>
  <div class="dev-lnb-tree">
    <div class="dev-lnb-tree__title">
      <div class="col">
        {{ title }}
      </div>
      <kw-icon
        v-if="expandedAll"
        name="minus"
        tooltip="Collapse All"
        @click="setExpandedAll(false)"
      />
      <kw-icon
        v-else
        name="plus"
        tooltip="Expand All"
        @click="setExpandedAll(true)"
      />
    </div>

    <kw-tree
      ref="treeRef"
      :key="selectedGnbKey"
      :nodes="treeNodes"
      :expanded="expandedKeys"
      :selected="selectedLnbKey"
      select-leaf-only
      @update:expanded="onUpdateExpanded"
      @update:selected="onUpdateSelected"
    />
  </div>
</template>

<script>
import useLnbTree from '../../composables/private/useLnbTree';

export default {
  name: 'DevLnbTree',

  setup() {
    const lnbTreeCtx = useLnbTree();
    const { treeRef, selectedGnbKey } = lnbTreeCtx;

    const expandedAll = ref(false);

    function setExpandedAll(state) {
      expandedAll.value = state;

      if (state) {
        treeRef.value.expandAll();
      } else {
        treeRef.value.collapseAll();
      }
    }

    watch(selectedGnbKey, () => {
      setExpandedAll(false);
    });

    return {
      ...lnbTreeCtx,
      expandedAll,
      setExpandedAll,
    };
  },
};
</script>
