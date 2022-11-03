<template>
  <div class="web-lnb-tree">
    <div class="web-lnb-tree__title">
      {{ title }}
    </div>

    <q-tree
      ref="treeRef"
      :key="selectedGnbKey"
      :class="{'web-lnb-tree--empty': treeNodes.length === 0}"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="treeNodes"
      :duration="100"
      node-key="key"
      label-key="label"
      no-connectors
      @update:expanded="onUpdateExpanded"
      @update:selected="onUpdateSelected"
    >
      <template #default-header="{node, expanded}">
        <div
          class="web-lnb-tree__node"
          :class="`web-lnb-tree__node--depth-${node.depth}`"
        >
          <div class="web-lnb-tree__node-content">
            {{ node.label }}
          </div>
          <q-icon
            v-if="node.children?.length"
            class="web-lnb-tree__arrow"
            :class="{'web-lnb-tree__arrow--expanded': expanded}"
            name="arrow_down"
          />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import useLnbTree from '../../composables/private/useLnbTree';

export default {
  name: 'WebLnbMenus',

  setup() {
    return {
      ...useLnbTree(),
    };
  },
};
</script>
