import { alert } from '../../plugins/dialog';

export default () => {
  const { getters, commit } = useStore();
  const { isNavigationFailure, push } = useRouter();
  const { t } = useI18n();

  const searchMenuName = ref('');
  const options = ref([]);

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

  let prevInvokedTime = 0;
  let prevInvokedVal;
  const inputDebounce = 300;
  const menus = getters['meta/getMenus'];
  async function onFilter(val, update, abort) {
    if (val.length < 2) {
      abort();
      return;
    }

    const invokedTime = new Date().valueOf();
    const isInvokedInDebounce = invokedTime - prevInvokedTime <= inputDebounce + 100;
    const isSameVal = val === prevInvokedVal;

    prevInvokedTime = invokedTime;
    prevInvokedVal = val;

    if (isInvokedInDebounce && isSameVal) {
      update();
      return;
    }

    try {
      console.log(menus);
      options.value = menus.filter((item) => item.menuName.indexOf(val) > -1 && item.pageDestinationValue !== null)
        .map((v) => ({
          ...v,
          value: v.menuUid,
          label: `${v.menuName} / 매뉴`,
        }));
    } finally {
      update();
    }
  }

  return {
    apps,
    isSelected,
    updateSelected,
    searchMenuName,
    onFilter,
    options,
    onUpdateValue,
  };
};
