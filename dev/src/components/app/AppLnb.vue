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
      :nodes="hierarchyedLnbs"
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
import { useLnb } from '~lib';

const { commit } = useStore();
const { getRoutes, currentRoute } = useRouter();

(function createDevGnbs() {
  function fillIncompleteLnbs(nodes, index = 0) {
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
      return fillIncompleteLnbs([...nodes.splice(0, index), insNode, ...nodes], index);
    }

    return fillIncompleteLnbs(nodes, index + 1);
  }

  const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
  const incompleteLnbs = globImportedRoutes.map((v) => ({ gnbKey: v.name.split('/')[1], key: v.name, label: v.meta.label }));
  commit('app/setLnbs', fillIncompleteLnbs(incompleteLnbs));
}());

watch(currentRoute, async (val) => {
  if (val.meta.isGlobImport) {
    commit('app/setSelectedGnbKey', val.name.split('/')[1]);
    commit('app/setSelectedLnbKey', val.name);
  }
});

const {
  lnbRef,
  isExpanded,
  expandedKeys,
  selectedGnbKey,
  selectedLnbKey,
  hierarchyedLnbs,
  isSelected,
  toggleLnb,
  onUpdateSelected,
  onUpdateExpanded,
} = useLnb();
</script>
