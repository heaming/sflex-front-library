import { alert } from '../../plugins/dialog';
import env from '../../consts/private/env';

export default () => {
  const { getters, commit } = useStore();
  const { isNavigationFailure, push } = useRouter();
  const { t } = useI18n();

  let apps = getters['app/getGlobalApps'];
  const selectedKey = computed(() => getters['app/getSelectedGlobalAppKey']);
  function createHierarchyData(menus, key) {
    return menus
      .filter((v) => (key !== 'ROOT' ? key.endsWith(v.parentsMenuUid) : v.menuLevel === 0))
      .reduce((a, v) => {
        v.key = `${key}.${v.menuUid}`;
        v.children = createHierarchyData(menus, v.key);
        if (v.folderYn === 'Y' && v.children.length === 0) {
        // do something
        } else {
          a.push(v);
        }
        return a;
      }, []);
  }
  if ((env.MODE === 'dev' || env.DEV) && !env.IS_LIBRARY) {
    apps = apps.filter((app) => {
      const menuPageRes = getters['meta/getMenus'];

      const menus = menuPageRes.filter((v) => v.applicationId === app.key);
      // console.log(menus);
      const hierarchyData = {
        key: 'ROOT',
        portalId: app.portalId,
        applicationId: app.key,
        menuLevel: -1,
        menuName: app.applicationName,
        folderYn: 'Y',
        children: createHierarchyData(menus, 'ROOT'),
      };
      return hierarchyData.children.length > 0;
    });
  }

  const isSelected = (appKey) => appKey === selectedKey.value;

  function updateSelected(appKey) {
    commit('app/setSelectedGlobalAppKey', appKey);
    commit('app/setSelectedGlobalMenuKey', null);
    commit('app/setLeftExist', true);
  }

  // if (!selectedKey.value) {
  //   const appKey = apps[0]?.key || null;
  //
  //   console.log('test');
  //   console.log(appKey);
  //   updateSelected(appKey);
  // }

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
    updateSelected,
    onUpdateValue,
  };
};
