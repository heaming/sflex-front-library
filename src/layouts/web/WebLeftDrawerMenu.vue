<template>
  <div class="web-left-drawer__menu">
    <web-left-drawer-title
      :title="title"
    />

    <q-scroll-area>
      <q-tree
        ref="treeRef"
        :key="selectedGlobalAppKey"
        class="web-left-drawer__menu menu-tree"
        :class="{'menu-tree--empty': treeNodes.length === 0}"
        :selected="selectedGlobalMenuKey"
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
            class="menu-tree__node"
            :class="`menu-tree__node--depth-${node.depth}`"
          >
            <div class="menu-tree__node-content">
              {{ node.label }}
            </div>
            <q-icon
              v-if="node.children?.length"
              class="menu-tree__arrow"
              :class="{'menu-tree__arrow--expanded': expanded}"
              name="arrow_down"
            />
          </div>
        </template>
      </q-tree>
    </q-scroll-area>
  </div>
</template>

<script>
import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';
import useLeftDrawerMenu from '../../composables/private/useLeftDrawerMenu';

export default {
  name: 'WebLeftDrawerMenu',
  components: {
    WebLeftDrawerTitle,
  },

  setup() {
    return {
      ...useLeftDrawerMenu(),
    };
  },
};
</script>
