import { platform } from '../../plugins/platform';

export default {
  namespaced: true,

  state: () => ({
    leftDrawerExpanded: !platform.is.mobile,

    globalApps: [],
    selectedGlobalAppKey: null,

    globalMenus: [],
    selectedGlobalMenuKey: null,
  }),

  mutations: {
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
        appKey: v.appKey || v.applicationId,
        key: v.key || v.menuUid,
        parentsKey: v.parentsKey || v.parentsMenuUid,
        label: v.label || v.menuName,
        depth: v.depth || v.menuLevel,
      }));

      commit('setGlobalMenus', normalizedMenus);
    },
  },
};
