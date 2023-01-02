import { isNavigationFailure } from 'vue-router';
import { alert } from '../../plugins/dialog';
import { http } from '../../plugins/http';

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
  const expandedKeys = ref([]);

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

  watch(selectedGlobalAppKey, (appKey) => {
    title.value = globalApps.find((v) => v.key === appKey)?.label;
    treeNodes.value = createNodes(appKey);
    expandedKeys.value = recursiveGetKeys(appKey, selectedGlobalMenuKey.value);
  }, { immediate: true });

  function onUpdateExpanded(expanded) {
    expandedKeys.value = expanded;
  }

  async function logging(menuKey) {
    const menu = getters['meta/getMenu'](menuKey);

    if (menu === undefined) return;

    const logData = {
      menuLogTypeCode: 'MENU',
      menuLogObjectId: menu.menuUid,
      menuName: menu.menuName,
      appId: menu.applicationId,
      pageId: menu.pageId,
    };

    try {
      await http.post('/sflex/common/common/portal/menus/logging', logData, { useSpinner: false });
    } catch (e) {
      // ignore
    }
  }

  async function handleUpdateSelected(menuKey) {
    try {
      await push({ name: menuKey });
      commit('app/setSelectedGlobalMenuKey', menuKey);
      logging(menuKey);
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
    onUpdateExpanded,
    onUpdateSelected,
  };
};
