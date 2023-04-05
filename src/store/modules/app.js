import { platform } from '../../plugins/platform';

export default {
  namespaced: true,

  state: () => ({
    isHomecardChanged: false,
    isLeftExist: true,
    leftDrawerExpanded: !platform.is.mobile,

    globalApps: [],
    selectedGlobalAppKey: null,

    globalMenus: [],
    selectedGlobalMenuKey: null,
  }),

  mutations: {
    setUserHomecardChanged(state, exist) {
      state.isHomecardChanged = exist;
    },
    setLeftExist(state, exist) {
      state.isLeftExist = exist;
      if (!exist) {
        // LEFT가 없는 상황에서는 gnb 의 select 표시를 없앤다. (null처리)
        state.selectedGlobalAppKey = null;
      }
    },
    setLeftDrawerExpanded(state, expanded) {
      state.leftDrawerExpanded = expanded;
    },
    setGlobalApps(state, apps) {
      state.globalApps = apps;
    },
    setSelectedGlobalAppKey(state, appKey) {
      state.selectedGlobalAppKey = appKey;
    },
    setGlobalMenus(state, menus) {
      state.globalMenus = menus;
    },
    setSelectedGlobalMenuKey(state, menuKey) {
      state.selectedGlobalMenuKey = menuKey;
    },
  },

  getters: {
    getUserHomecardChanged: (state) => state.isHomecardChanged,
    getLeftExist: (state) => state.isLeftExist,
    getLeftDrawerExpanded: (state) => state.leftDrawerExpanded,
    getGlobalApps: (state) => state.globalApps,
    getSelectedGlobalAppKey: (state) => state.selectedGlobalAppKey,
    getGlobalMenus: (state) => state.globalMenus,
    getSelectedGlobalMenuKey: (state) => state.selectedGlobalMenuKey,
  },

  actions: {
    createGlobalApps({ commit }, apps) {
      const normalizedApps = apps.map((v) => ({
        key: v.key || v.applicationId,
        label: v.label || v.applicationName,
      }));

      commit('setGlobalApps', normalizedApps);
    },
    createGlobalMenus({ commit }, menus) {
      const normalizedMenus = menus.map((v) => ({
        appKey: v.applicationId,
        key: v.menuUid,
        parentsKey: v.parentsMenuUid,
        label: v.menuName,
        depth: v.menuLevel,
        isFolder: v.folderYn === 'Y',
      }));

      commit('setGlobalMenus', normalizedMenus);
    },
  },
};
