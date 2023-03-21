import { alert } from '../../plugins/dialog';

export default () => {
  const { getters, commit } = useStore();
  const { isNavigationFailure, push } = useRouter();
  const { t } = useI18n();

  const apps = readonly(getters['app/getGlobalApps']);
  const selectedKey = computed(() => getters['app/getSelectedGlobalAppKey']);

  const isSelected = (appKey) => appKey === selectedKey.value;

  function updateSelected(appKey) {
    commit('app/setSelectedGlobalAppKey', appKey);
    commit('app/setSelectedGlobalMenuKey', null);
  }

  if (!selectedKey.value) {
    const appKey = apps[0]?.key || null;
    updateSelected(appKey);
  }

  async function onUpdateValue(val) {
    const { menuUid } = val || {};

    if (menuUid) {
      try {
        await push({ name: menuUid });
      } catch (e) {
        if (isNavigationFailure(e, 1)) { // matcher not found
          await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
        } else {
          throw e;
        }
      }
    }
  }

  return {
    apps,
    isSelected,
    selectedKey,
    // updateSelected,
    onUpdateValue,
  };
};
