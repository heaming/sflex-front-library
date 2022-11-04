<template>
  <div class="dev-lnb-tree">
    <div class="dev-lnb-tree__title">
      {{ title }}
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
    return {
      ...useLnbTree(),
    };
  },
};
</script>
