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

  function setExpanded(lnbKey, value, recursive = false) {
    value ??= !lnbRef.value.isExpanded(lnbKey);
    lnbRef.value.setExpanded(lnbKey, value);

    if (recursive) {
      const { parentsKey } = lnbRef.value.getNodeByKey(lnbKey);
      if (parentsKey) setExpanded(parentsKey, value, recursive);
    }
  }

  onMounted(() => {
    watch(selectedGnbKey, async (gnbKey) => {
      hierarchyedLnbs.value = createHierarchyedLnbs(gnbKey);
      await nextTick();

      const lnbKey = selectedLnbKey.value;
      const isIncludedLnbKey = !!lnbKey && lnbs.some((v) => v.gnbKey === gnbKey && v.key === lnbKey);
      const expandedTargetKey = isIncludedLnbKey ? lnbKey : gnbKey;

      setExpanded(expandedTargetKey, true, true);
    }, { immediate: true });

    watch(selectedLnbKey, async (lnbKey) => {
      selectedLnbKeys.value = [];
      await nextTick();

      let key = lnbKey;
      while (key) {
        selectedLnbKeys.value.push(key);
        key = lnbRef.value.getNodeByKey(key).parentsKey;
      }
    }, { immediate: true });
  });

  const isSelected = (lnbKey) => selectedLnbKeys.value.includes(lnbKey);

  const isRoot = (lnbKey) => lnbRef.value.getNodeByKey(lnbKey).key === selectedGnbKey.value;
  const isLeaf = (lnbKey) => !lnbRef.value.getNodeByKey(lnbKey).children.length;

  async function updateSelected(lnbKey) {
    if (isLeaf(lnbKey)) {
      try {
        await push({ name: lnbKey });
        commit('app/setSelectedLnbKey', lnbKey);
      } catch (e) {
        if (isNavigationFailure(e, MATCHER_NOT_FOUND)) { await alert(t('MSG_ALT_PAGE_NOT_FOUND')); }
        throw e;
      }
      return;
    }

    if (!isRoot(lnbKey)) { setExpanded(lnbKey); }
  }

  function toggleLnb() {
    commit('app/setLnbExpanded', !isExpanded.value);
  }

  return {
    lnbRef,
    hierarchyedLnbs,
    isExpanded,
    selectedGnbKey,
    selectedLnbKey,
    isSelected,
    updateSelected,
    toggleLnb,
  };
};
