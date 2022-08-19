<template>
  <q-drawer
    :model-value="lnbExpanded"
    show-if-above
    bordered
    class="kw-lnb"
  >
    <div class="q-pa-md q-gutter-sm">
      <kw-input
        v-model="lnbFilter"
        clearable
      />

      <q-tree
        :key="selectedAppId"
        ref="lnbRef"
        :selected="selectedLnbKey"
        :nodes="lnbItems"
        :filter="lnbFilter"
        :duration="100"
        default-expand-all
        no-selection-unset
        node-key="key"
        selected-color="primary"
        class="kw-lnb-tree"
        @update:selected="onSelect"
      />
    </div>
  </q-drawer>
  <kw-btn
    icon="lnb_arrow| 0 0 16 16"
    class="kw-lnb-switch"
    @click="dispatch('app/toggleLnb')"
  />
</template>

<script setup>

const { getters } = useStore();

const lnbExpanded = computed(() => getters['app/getLnbExpanded']);
const selectedAppId = computed(() => getters['app/getSelectedAppId']);

const lnbRef = ref();
const lnbItems = ref([]);
const lnbFilter = ref('');
const selectedLnbKey = ref(null);

function fillNodes(nodes, i = 0) {
  if (i === nodes.length) return nodes;

  const arr = nodes[i].key.split('/');
  const key = arr.slice(0, arr.length - 1).join('/');
  const level = arr.length - 2;

  nodes[i].level = level;
  nodes[i].parentKey = key;

  if (level > 0 && !nodes.some((e) => e.key === key)) {
    const preNodes = nodes.splice(0, i);
    const newNode = { key, label: arr[arr.length - 2] };
    return fillNodes([...preNodes, newNode, ...nodes], i);
  }

  return fillNodes(nodes, i + 1);
}

function createHierarchy(nodes, currents) {
  currents ||= nodes.filter((e) => e.level === 0);

  return currents.map((e) => {
    const nexts = nodes.filter((x) => x.parentKey === e.key);
    const children = createHierarchy(nodes, nexts);

    return { ...e, children };
  });
}

const router = useRouter();

watch(selectedAppId, async (val) => {
  const nodes = fillNodes(
    router.getRoutes()
      .filter((e) => e.path.startsWith(`/${val}`))
      .map((e) => ({ key: e.path, label: e.meta.name })),
  );

  lnbItems.value = createHierarchy(nodes);
  lnbFilter.value = '';
  selectedLnbKey.value = null;
}, { immediate: true });

async function onSelect(key) {
  const node = lnbRef.value.getNodeByKey(key);
  const isLeaf = !node.children.length;

  if (isLeaf) {
    await router.push({ path: key });
    selectedLnbKey.value = key;
  } else {
    const state = !lnbRef.value.isExpanded(key);
    lnbRef.value.setExpanded(key, state);
  }
}
const { dispatch } = useStore();
</script>
