<template>
  <dev-layout>
    <dev-header>
      <template #logo>
        <kw-btn
          borderless
          to="/"
          replace
        >
          <img
            src="~~@assets/images/logo_kss.svg"
            alt="KSS"
            height="24"
          >
          DEV
        </kw-btn>
      </template>
    </dev-header>

    <dev-left-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </dev-layout>
</template>

<script setup>
import {
  DevLayout, DevHeader, DevLeftDrawer,
} from '~kw-lib';

const { commit } = useStore();
const { getRoutes } = useRouter();

function recursiveCreateGlobalMenus(nodes, index = 0) {
  if (index === nodes.length) return nodes;

  const splited = nodes[index].key.split('/');
  const key = splited.slice(0, splited.length - 1).join('/');
  const depth = splited.length - 3;

  nodes[index].appKey = splited[1];
  nodes[index].depth = depth;
  nodes[index].parentsKey = key;

  const hasParent = depth > 0 && !nodes.some((e) => e.key === key);

  if (hasParent) {
    const node = { key, label: splited[splited.length - 2] };
    return recursiveCreateGlobalMenus([...nodes.splice(0, index), node, ...nodes], index);
  }

  return recursiveCreateGlobalMenus(nodes, index + 1);
}

const globImportedRoutes = getRoutes().filter(({ meta }) => meta.glob === true);
const appKeys = Object.keys(globImportedRoutes.reduce((a, e) => { a[e.path.split('/')[1]] = null; return a; }, {}));

const globalApps = appKeys.map((v) => ({ key: v, label: v }));
const globalMenus = globImportedRoutes.map((v) => ({ appKey: v.name.split('/')[1], key: v.name, label: v.meta.label }));

commit('app/setGlobalApps', globalApps);
commit('app/setGlobalMenus', recursiveCreateGlobalMenus(globalMenus));
</script>
