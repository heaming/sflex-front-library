<template>
  <div class="web-left-drawer__menu drawer-menu">
    <web-left-drawer-title
      :title="title"
    />

    <kw-scroll-area>
      <q-tree
        ref="treeRef"
        :key="selectedGlobalAppKey"
        class="web-left-drawer__menu drawer-menu__tree"
        :class="{'drawer-menu__tree--empty': treeNodes.length === 0}"
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
            class="drawer-menu__node"
            :class="`drawer-menu__node--depth-${node.depth}`"
          >
            <div class="drawer-menu__node-content">
              {{ node.label }}
            </div>
            <q-icon
              v-if="node.children?.length"
              class="drawer-menu__node-arrow"
              :class="{'drawer-menu__node-arrow--expanded': expanded}"
              name="arrow_down"
            />
          </div>
        </template>
      </q-tree>
    </kw-scroll-area>
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
