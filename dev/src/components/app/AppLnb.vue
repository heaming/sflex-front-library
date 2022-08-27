<template>
  <q-drawer
    class="kw-lnb"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <q-tree
      ref="lnbRef"
      :key="selectedGnbKey"
      class="py20 pl10"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="hierarchyedLnbItems"
      icon="arrow_right_24"
      :duration="100"
      node-key="key"
      label-key="label"
      no-selection-unset
      no-nodes-label=" "
      @update:selected="onUpdateSelected"
      @update:expanded="onUpdateExpanded"
    >
      <template #default-header="{node}">
        <div :class="{'text-bold text-black': isSelected(node.key)}">
          {{ node.label }}
        </div>
      </template>
    </q-tree>

    <kw-btn
      icon="lnb_arrow"
      class="kw-lnb-switch"
      :class="{'kw-lnb-switch--active': isExpanded}"
      @click="toggleLnb"
    />
  </q-drawer>
</template>

<script setup>
import { useLnb } from '~kw-lib';

const { commit } = useStore();
const { getRoutes, currentRoute } = useRouter();

(function createDevLnbs() {
  function fillIncompleteLnbItems(nodes, index = 0) {
    if (index === nodes.length) return nodes;

    const splited = nodes[index].key.split('/');
    const key = splited.slice(0, splited.length - 1).join('/');
    const depth = splited.length - 3;

    nodes[index].gnbKey = splited[1];
    nodes[index].depth = depth;
    nodes[index].parentsKey = key;

    const hasParent = depth > 0 && !nodes.some((e) => e.key === key);

    if (hasParent) {
      const insNode = { key, label: splited[splited.length - 2] };
      return fillIncompleteLnbItems([...nodes.splice(0, index), insNode, ...nodes], index);
    }

    return fillIncompleteLnbItems(nodes, index + 1);
  }

  const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
  const incompleteLnbItems = globImportedRoutes.map((v) => ({ gnbKey: v.name.split('/')[1], key: v.name, label: v.meta.label }));
  commit('app/setLnbItems', fillIncompleteLnbItems(incompleteLnbItems));
}());

function updateSelectedGnbLnb(route) {
  const { meta, name } = route;

  if (meta.isGlobImport) {
    commit('app/setSelectedGnbKey', name.split('/')[1]);
    commit('app/setSelectedLnbKey', name);
  }
}

(function initSelectedGnbLnb() {
  const hash = window.location.hash.split('#')[1];
  const route = getRoutes().find((v) => v.name === hash);
  if (route) updateSelectedGnbLnb(route);
}());

watch(currentRoute, updateSelectedGnbLnb);

const {
  lnbRef,
  isExpanded,
  expandedKeys,
  selectedGnbKey,
  selectedLnbKey,
  hierarchyedLnbItems,
  isSelected,
  toggleLnb,
  onUpdateSelected,
  onUpdateExpanded,
} = useLnb();

</script>
