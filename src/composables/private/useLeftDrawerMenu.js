import { isNavigationFailure } from 'vue-router';
import { union, cloneDeep } from 'lodash-es';
import { alert } from '../../plugins/dialog';

export default () => {
  const { getters, commit } = useStore();
  const { push } = useRouter();
  const { t } = useI18n();

  const globalApps = getters['app/getGlobalApps'];
  const globalMenus = getters['app/getGlobalMenus'];
  const selectedGlobalAppKey = computed(() => getters['app/getSelectedGlobalAppKey']);
  const selectedGlobalMenuKey = computed(() => getters['app/getSelectedGlobalMenuKey']);

  const treeRef = ref();
  const title = ref();
  const treeNodes = ref([]);
  const tempNodes = ref([]);
  const expandedKeys = ref([]);
  const selectedKeys = ref([]);

  function createHierarchy(nodes, currents) {
    return currents.map((c) => ({
      ...c,
      children: c.isFolder ? createHierarchy(nodes, nodes.filter((n) => n.parentsKey === c.key)) : [],
    }));
  }

  function createNodes(appKey) {
    const nodes = globalMenus.filter((v) => v.appKey === appKey);
    const roots = nodes.filter((v) => v.depth === 0);
    return createHierarchy(nodes, roots);
  }

  function recursiveGetKeys(appKey, menuKey) {
    const matched = menuKey ? globalMenus.find((v) => v.appKey === appKey && v.key === menuKey) : null;
    return matched ? [...recursiveGetKeys(appKey, matched.parentsKey), menuKey] : [];
  }

  function isSelected(key) {
    return selectedKeys.value.includes(key);
  }

  function reOrderForSelectedMenu(nodes) {
    let depth2MenuIdx;
    nodes.forEach((depth2Menu, menuIdx) => {
      if (isSelected(depth2Menu.key)) depth2MenuIdx = menuIdx;
    });
    if (depth2MenuIdx) {
      const tempMenu = nodes[depth2MenuIdx];
      nodes.splice(depth2MenuIdx, 1);
      nodes.unshift(tempMenu);
    }
  }

  watch(selectedGlobalAppKey, (appKey) => {
    title.value = globalApps.find((v) => v.key === appKey)?.label;
    tempNodes.value = createNodes(appKey);
    treeNodes.value = cloneDeep(tempNodes.value);
    selectedKeys.value = recursiveGetKeys(appKey, selectedGlobalMenuKey.value);
    reOrderForSelectedMenu(treeNodes.value);
    expandedKeys.value = [...selectedKeys.value];
  }, { immediate: true });

  watch(selectedGlobalMenuKey, (menuKey) => {
    selectedKeys.value = recursiveGetKeys(selectedGlobalAppKey.value, menuKey);
    treeNodes.value = cloneDeep(tempNodes.value);
    reOrderForSelectedMenu(treeNodes.value);
    expandedKeys.value = union([...expandedKeys.value, ...selectedKeys.value]);
  });

  function onUpdateExpanded(expanded) {
    expandedKeys.value = expanded;
  }

  async function handleUpdateSelected(menuKey) {
    try {
      await push({ name: menuKey });
      commit('app/setSelectedGlobalMenuKey', menuKey);
    } catch (e) {
      if (isNavigationFailure(e, 1)) { // matcher not found
        await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
      } else {
        throw e;
      }
    }
  }

  function handleUpdateExpanded(menuKey) {
    const expanded = treeRef.value.isExpanded(menuKey);
    treeRef.value.setExpanded(menuKey, !expanded);
  }

  async function onUpdateSelected(menuKey) {
    menuKey ||= selectedGlobalMenuKey.value;

    const node = treeRef.value.getNodeByKey(menuKey);
    const isLeaf = (node.children?.length || 0) === 0;

    if (isLeaf) {
      handleUpdateSelected(menuKey);
    } else {
      handleUpdateExpanded(menuKey);
    }
  }

  return {
    selectedGlobalAppKey,
    selectedGlobalMenuKey,
    treeRef,
    title,
    treeNodes,
    expandedKeys,
    isSelected,
    onUpdateExpanded,
    onUpdateSelected,
  };
};
