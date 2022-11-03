<template>
  <div class="lnb-tree">
    <div class="lnb-tree__title">
      {{ title }}
    </div>

    <q-tree
      ref="treeRef"
      :key="selectedGnbKey"
      :class="{'lnb-tree--empty': treeNodes.length === 0}"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="treeNodes"
      :duration="100"
      node-key="key"
      label-key="label"
      no-connectors
      @update:selected="onSelect"
    >
      <template #default-header="{node, expanded}">
        <div
          class="lnb-tree__node"
          :class="`lnb-tree__node--depth-${node.depth}`"
        >
          <div class="lnb-tree__node-content">
            {{ node.label }}
          </div>
          <q-icon
            v-if="node.children?.length"
            class="lnb-tree__arrow"
            :class="{'lnb-tree__arrow--expanded': expanded}"
            name="arrow_down"
          />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import useLnbTree from './private/useLnbTree';

export default {
  name: 'WebLnbMenus',

  setup() {
    return {
      ...useLnbTree(),
    };
  },
};
</script>
