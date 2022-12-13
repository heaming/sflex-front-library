<template>
  <div class="dev-left-drawer__menus">
    <div class="dev-left-drawer__title">
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
