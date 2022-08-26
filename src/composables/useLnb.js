import { cloneDeep } from 'lodash-es';
import { isNavigationFailure } from 'vue-router';
import { alert } from '../plugins/dialog';

const MATCHER_NOT_FOUND = 1;

export default () => {
  const { getters, commit } = useStore();
  const { push } = useRouter();
  const { t } = useI18n();

  const lnbRef = ref();
  const gnbs = getters['app/getGnbs'];
  const lnbs = getters['app/getLnbs'];

  const isExpanded = computed(() => getters['app/getLnbExpanded']);
  const expandedKeys = ref([]);
  const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);
  const selectedLnbKey = computed(() => getters['app/getSelectedLnbKey']);
  const selectedLnbKeys = ref([]);
  const hierarchyedLnbs = ref([]);

  function createHierarchy(targetLnbs, nodes, root = true) {
    nodes.forEach((n) => {
      n.children = targetLnbs
        .filter((v) => (root ? v.depth === 0 : v.parentsKey === n.key))
        .map((v) => ({ ...v, parentsKey: n.key }));

      createHierarchy(targetLnbs, n.children, false);
    });
  }

  function createHierarchyedLnbs(gnbKey) {
    const targetLnbs = cloneDeep(lnbs.filter((v) => v.gnbKey === gnbKey));
    const nHierarchyedLnbs = cloneDeep(gnbs.filter((v) => v.key === gnbKey));
    createHierarchy(targetLnbs, nHierarchyedLnbs);
    return nHierarchyedLnbs;
  }

  function recursiveGetKeys(gnbKey, lnbKey) {
    const matched = lnbKey ? lnbs.find((v) => v.gnbKey === gnbKey && v.key === lnbKey) : null;
    return matched ? [...recursiveGetKeys(gnbKey, matched.parentsKey), lnbKey] : [gnbKey];
  }

  watch(selectedGnbKey, (gnbKey) => {
    hierarchyedLnbs.value = createHierarchyedLnbs(gnbKey);
    expandedKeys.value = recursiveGetKeys(gnbKey, selectedLnbKey.value);
  }, { immediate: true });

  watch(selectedLnbKey, (lnbKey) => {
    selectedLnbKeys.value = recursiveGetKeys(selectedGnbKey.value, lnbKey);
  }, { immediate: true });

  async function onUpdateSelectedLeaf(lnbKey) {
    try {
      await push({ name: lnbKey });
    } catch (e) {
      if (isNavigationFailure(e, MATCHER_NOT_FOUND)) { await alert(t('MSG_ALT_PAGE_NOT_FOUND')); }
      throw e;
    }
  }

  const isRoot = (lnbKey) => lnbRef.value.getNodeByKey(lnbKey).key === selectedGnbKey.value;
  const isLeaf = (lnbKey) => lnbRef.value.getNodeByKey(lnbKey).children.length === 0;

  function onUpdateSelectedGroup(lnbKey) {
    if (isRoot(lnbKey)) return;

    const expanded = expandedKeys.value;
    const index = expanded.findIndex((v) => v === lnbKey);

    if (index > 0) {
      expanded.splice(index, 1);
    } else {
      expanded.push(lnbKey);
    }
  }

  function onUpdateSelected(lnbKey) {
    if (isLeaf(lnbKey)) {
      onUpdateSelectedLeaf(lnbKey);
    } else {
      onUpdateSelectedGroup(lnbKey);
    }
  }

  function onUpdateExpanded(exapnded) {
    const hasRoot = exapnded.length > 0 && isRoot(exapnded[0]);
    if (hasRoot) expandedKeys.value = exapnded;
  }

  const isSelected = (lnbKey) => selectedLnbKeys.value.includes(lnbKey);
  const toggleLnb = () => { commit('app/setLnbExpanded', !isExpanded.value); };

  return {
    lnbRef,
    hierarchyedLnbs,
    isExpanded,
    expandedKeys,
    selectedGnbKey,
    selectedLnbKey,
    selectedLnbKeys,
    isSelected,
    toggleLnb,
    onUpdateSelected,
    onUpdateExpanded,
  };
};
