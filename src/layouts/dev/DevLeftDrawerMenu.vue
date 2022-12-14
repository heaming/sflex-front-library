<template>
  <div class="dev-left-drawer__menu">
    <div class="dev-left-drawer__menu-control">
      <kw-btn
        dense
        icon="plus"
        label="Expand All"
        clickable
        @click="setExpandedAll(true)"
      />
      <kw-btn
        dense
        icon="minus"
        label="Collapse All"
        clickable
        @click="setExpandedAll(false)"
      />
    </div>

    <kw-tree
      ref="treeRef"
      :key="selectedGlobalAppKey"
      :nodes="treeNodes"
      :expanded="expandedKeys"
      :selected="selectedGlobalMenuKey"
      select-leaf-only
      @update:expanded="onUpdateExpanded"
      @update:selected="onUpdateSelected"
    />
  </div>
</template>

<script>
import useLeftDrawerMenu from '../../composables/private/useLeftDrawerMenu';

export default {
  name: 'DevLeftDrawerMenu',

  setup() {
    const menuCtx = useLeftDrawerMenu();

    const { treeRef, selectedGlobalAppKey } = menuCtx;
    const expandedAll = ref(false);

    function setExpandedAll(state) {
      expandedAll.value = state;

      if (state) {
        treeRef.value.expandAll();
      } else {
        treeRef.value.collapseAll();
      }
    }

    watch(selectedGlobalAppKey, () => setExpandedAll(false));

    return {
      ...menuCtx,
      expandedAll,
      setExpandedAll,
    };
  },
};
</script>
