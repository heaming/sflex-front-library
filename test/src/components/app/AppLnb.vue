<template>
  <q-drawer
    :model-value="lnbExpanded"
    show-if-above
    bordered
  >
    <div class="q-pa-md q-gutter-sm">
      <kw-input
        v-model="lnbFilter"
        label="Filter"
        clearable
      />

      <q-tree
        :key="selectedAppId"
        ref="lnbRef"
        :selected="selectedLnbId"
        :nodes="lnbItems"
        :filter="lnbFilter"
        :duration="100"
        default-expand-all
        no-selection-unset
        node-key="menuUid"
        label-key="menuName"
        selected-color="primary"
        @update:selected="onSelect"
      />
    </div>
  </q-drawer>
</template>

<script setup>
import { isNavigationFailure } from 'vue-router';
import { alert } from '~lib';

const { t } = useI18n();
const store = useStore();
const router = useRouter();

const lnbExpanded = computed(() => store.getters['app/getLnbExpanded']);
const selectedAppId = computed(() => store.getters['app/getSelectedAppId']);

const lnbRef = ref();
const lnbItems = ref([]);
const lnbFilter = ref('');
const selectedLnbId = ref(null);

function createHierarchy(nodes, currents = nodes.filter((e) => e.menuLevel === 0)) {
  return currents.map((e) => {
    const nexts = nodes.filter((x) => x.parentsMenuUid === e.menuUid);
    const children = createHierarchy(nodes, nexts);

    return { ...e, children };
  });
}

watch(selectedAppId, async (val) => {
  const appMenus = store.getters['meta/getAppMenus'](val);

  lnbItems.value = createHierarchy(appMenus);
  lnbFilter.value = '';
  selectedLnbId.value = null;
}, { immediate: true });

async function onSelect(key) {
  const node = lnbRef.value.getNodeByKey(key);
  const isLeaf = !node.children.length;

  if (isLeaf) {
    try {
      await router.push({ name: node.menuUid });
      selectedLnbId.value = node.menuUid;
    } catch (e) {
      if (isNavigationFailure(e, 1)) {
        await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
        return;
      }

      throw e;
    }
  } else {
    const state = !lnbRef.value.isExpanded(key);
    lnbRef.value.setExpanded(key, state);
  }
}
</script>
