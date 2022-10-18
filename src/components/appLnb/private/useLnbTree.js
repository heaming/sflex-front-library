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
  const selectedKeys = ref([]);

  function createHierarchy(nodes, currents) {
    return currents.map((c) => ({
      ...c, children: createHierarchy(nodes, nodes.filter((n) => n.parentsKey === c.key)),
    }));
  }

  function createTreeNodes(gnbKey) {
    const nodes = lnbItems.filter((v) => v.gnbKey === gnbKey);
    const roots = nodes.filter((v) => v.depth === 0);
    return createHierarchy(nodes, roots);
  }

  function recursiveGetKeys(gnbKey, lnbKey) {
    const matched = lnbKey ? lnbItems.find((v) => v.gnbKey === gnbKey && v.key === lnbKey) : null;
    return matched ? [...recursiveGetKeys(gnbKey, matched.parentsKey), lnbKey] : [];
  }

  watch(selectedGnbKey, (gnbKey) => {
    title.value = gnbItems.find((v) => v.key === gnbKey)?.label;
    treeNodes.value = createTreeNodes(gnbKey);
    expandedKeys.value = recursiveGetKeys(gnbKey, selectedLnbKey.value);
  }, { immediate: true });

  watch(selectedLnbKey, (lnbKey) => {
    selectedKeys.value = recursiveGetKeys(selectedGnbKey.value, lnbKey);
  }, { immediate: true });

  async function onUpdateSelectedLeaf(lnbKey) {
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

  function onUpdateSelectedGroup(lnbKey) {
    const expanded = expandedKeys.value;
    const index = expanded.findIndex((v) => v === lnbKey);

    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(lnbKey);
    }
  }

  function onUpdateSelected(lnbKey) {
    lnbKey ||= selectedLnbKey.value;

    const node = treeRef.value.getNodeByKey(lnbKey);
    const isLeaf = node.children.length === 0;

    if (isLeaf) {
      onUpdateSelectedLeaf(lnbKey);
    } else {
      onUpdateSelectedGroup(lnbKey);
    }
  }

  const isNodeSelected = (node) => selectedKeys.value.includes(node.key);
  const getNodeClass = (node) => [
    `lnb-tree__node--depth-${node.depth}`,
    isNodeSelected(node) && 'lnb-tree__node--selected',
  ];

  return {
    selectedGnbKey,
    selectedLnbKey,
    treeRef,
    title,
    treeNodes,
    expandedKeys,
    selectedKeys,
    onUpdateSelected,
    getNodeClass,
  };
};
