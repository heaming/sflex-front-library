import { isNavigationFailure } from 'vue-router';
import { alert } from '../../../plugins/dialog';

export default () => {
  const { getters, commit } = useStore();
  const { push } = useRouter();
  const { t } = useI18n();

  const gnbItems = getters['app/getGnbItems'];
  const lnbItems = getters['app/getLnbItems'];
  const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);
  const selectedLnbKey = computed(() => getters['app/getSelectedLnbKey']);

  const treeRef = ref();
  const title = ref();
  const treeNodes = ref([]);
  const expandedKeys = ref([]);

  function createHierarchy(nodes, currents) {
    return currents.map((c) => ({
      ...c, children: createHierarchy(nodes, nodes.filter((n) => n.parentsKey === c.key)),
    }));
  }

  function createNodes(gnbKey) {
    const nodes = lnbItems.filter((v) => v.gnbKey === gnbKey);
    const roots = nodes.filter((v) => v.depth === 0);
    return createHierarchy(nodes, roots);
  }

  function recursiveGetKeys(gnbKey, lnbKey) {
    const matched = lnbKey ? lnbItems.find((v) => v.gnbKey === gnbKey && v.key === lnbKey) : null;
    return matched ? [...recursiveGetKeys(gnbKey, matched.parentsKey), lnbKey] : [];
  }

  watch(selectedGnbKey, (key) => {
    title.value = gnbItems.find((v) => v.key === key)?.label;
    treeNodes.value = createNodes(key);
    expandedKeys.value = recursiveGetKeys(key, selectedLnbKey.value);
  }, { immediate: true });

  async function onUpdateSelected(lnbKey) {
    try {
      await push({ name: lnbKey });
      commit('app/setSelectedLnbKey', lnbKey);
    } catch (e) {
      if (isNavigationFailure(e, 1)) {
        // matcher not found
        await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
      }
      throw e;
    }
  }

  function onUpdateExpanded(lnbKey) {
    const expanded = expandedKeys.value;
    const index = expanded.findIndex((v) => v === lnbKey);

    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(lnbKey);
    }
  }

  function onSelect(lnbKey) {
    lnbKey ||= selectedLnbKey.value;

    const node = treeRef.value.getNodeByKey(lnbKey);
    const isLeaf = node.children.length === 0;

    if (isLeaf) {
      onUpdateSelected(lnbKey);
    } else {
      onUpdateExpanded(lnbKey);
    }
  }

  return {
    selectedGnbKey,
    selectedLnbKey,
    treeRef,
    title,
    treeNodes,
    expandedKeys,
    onSelect,
  };
};
