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
        node-key="key"
        label-key="label"
        no-transition
        no-connectors
        @update:expanded="onUpdateExpanded"
        @update:selected="onUpdateSelected"
      >
        <template #default-header="{node, expanded}">
          <div
            :class="{
              'drawer-menu__node': true,
              'drawer-menu__node--selected': isSelected(node.key),
              [`drawer-menu__node--depth-${node.depth}`]: true,
            }"
          >
            <div class="drawer-menu__node-content ellipsis">
              {{ node.label }}
              <kw-tooltip
                anchor="center right"
                self="center start"
                class="lnb_tooltip lnb_depth_tooltip"
              >
                {{ node.label }}
              </kw-tooltip>
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
