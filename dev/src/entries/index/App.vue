<template>
  <dev-layout>
    <dev-gnb />

    <dev-lnb />

    <q-page-container>
      <router-view />
    </q-page-container>
  </dev-layout>
</template>

<script setup>
import {
  DevLayout, DevGnb, DevLnb,
} from '~kw-lib';

const { commit } = useStore();
const { getRoutes } = useRouter();

function recursiveCreateLnbItems(nodes, index = 0) {
  if (index === nodes.length) return nodes;

  const splited = nodes[index].key.split('/');
  const key = splited.slice(0, splited.length - 1).join('/');
  const depth = splited.length - 3;

  nodes[index].gnbKey = splited[1];
  nodes[index].depth = depth;
  nodes[index].parentsKey = key;

  const hasParent = depth > 0 && !nodes.some((e) => e.key === key);

  if (hasParent) {
    const node = { key, label: splited[splited.length - 2] };
    return recursiveCreateLnbItems([...nodes.splice(0, index), node, ...nodes], index);
  }

  return recursiveCreateLnbItems(nodes, index + 1);
}

const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
const appKeys = Object.keys(globImportedRoutes.reduce((a, e) => { a[e.path.split('/')[1]] = null; return a; }, {}));

const gnbItems = appKeys.map((v) => ({ key: v, label: v }));
const lnbItems = globImportedRoutes.map((v) => ({ gnbKey: v.name.split('/')[1], key: v.name, label: v.meta.label }));

commit('app/setGnbItems', gnbItems);
commit('app/setLnbItems', recursiveCreateLnbItems(lnbItems));
</script>
