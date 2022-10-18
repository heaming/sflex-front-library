<template>
  <div class="lnb-menus">
    <div class="lnb-menus__title">
      {{ title }}
    </div>

    <q-tree
      ref="treeRef"
      :key="selectedGnbKey"
      class="lnb-tree"
      :class="{'lnb-tree--empty': treeNodes.length === 0}"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="treeNodes"
      :duration="100"
      node-key="key"
      label-key="label"
      no-selection-unset
      no-connectors
      @update:selected="onUpdateSelected"
    >
      <template #default-header="{node, expanded}">
        <div
          class="lnb-tree__node row items-center full-width"
          :class="getNodeClass(node)"
        >
          <div class="col">
            {{ node.label }}
          </div>
          <q-icon
            v-if="node.children.length"
            :class="{'rotate-180': expanded}"
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
  name: 'AppLnbMenus',

  setup() {
    return {
      ...useLnbTree(),
    };
  },
};
</script>
