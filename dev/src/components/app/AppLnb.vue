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
      class="kw-lnb-tree"
      :selected="selectedLnbKey"
      :nodes="hierarchyedLnbs"
      :duration="100"
      node-key="key"
      label-key="label"
      no-selection-unset
      selected-color="primary"
      @update:selected="updateSelected"
    />

    <kw-btn
      icon="lnb_arrow|0 0 16 16"
      class="kw-lnb-switch"
      :class="{'kw-lnb-switch--active': isExpanded}"
      @click="toggleLnb"
    />
  </q-drawer>
</template>

<script setup>
import { useLnb } from '~lib';

const { getRoutes } = useRouter();
const { commit } = useStore();

function fillIncompleteLnbs(nodes, index = 0) {
  if (index === nodes.length) return nodes;

  const splited = nodes[index].key.split('/');
  const key = splited.slice(0, splited.length - 1).join('/');
  const depth = splited.length - 3;

  nodes[index].gnbKey = splited[1];
  nodes[index].depth = depth;
  nodes[index].parentsKey = key;

  if (depth > 0 && !nodes.some((e) => e.key === key)) {
    return fillIncompleteLnbs([
      ...nodes.splice(0, index), { key, label: splited[splited.length - 2] }, ...nodes,
    ], index);
  }

  return fillIncompleteLnbs(nodes, index + 1);
}

(function createDevLnbs() {
  const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
  const incompleteLnbs = globImportedRoutes.map((v) => ({ gnbKey: v.path.split('/')[1], key: v.name, label: v.meta.label }));
  commit('app/setLnbs', fillIncompleteLnbs(incompleteLnbs));
}());

const {
  lnbRef,
  isExpanded,
  selectedGnbKey,
  selectedLnbKey,
  hierarchyedLnbs,
  toggleLnb,
  updateSelected,
} = useLnb();
</script>
