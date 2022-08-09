import { filter, find } from 'lodash-es';
import { http } from '../../plugins/http';
import replaceRoutesByMenus from '../../router/replaceRoutesByMenus';

const normalizeState = () => ({
  isAuthenticated: false,
  userInfo: {},
  lastLoginInfo: {},
  configs: [],
  notices: [],
  linkPages: [],
  apps: [],
  menus: [],
  pages: [],
});

export default {
  namespaced: true,
  state: normalizeState(),

  mutations: {
    setLoginInfo(state, { userInfo, lastLoginInfo }) {
      state.isAuthenticated = true;
      state.userInfo = Object.freeze(userInfo);
      state.lastLoginInfo = Object.freeze(lastLoginInfo);
    },
    setConfigs(state, configs) {
      state.configs = Object.freeze(configs);
    },
    setNotices(state, notices) {
      state.notices = Object.freeze(notices);
    },
    setLinkPages(state, linkPages) {
      state.linkPages = Object.freeze(linkPages);
    },
    setApps(state, apps) {
      state.apps = Object.freeze(apps);
    },
    setSelectedAppId(state, applicationId) {
      state.selectedAppId = applicationId;
    },
    setMenus(state, menus) {
      state.menus = Object.freeze(menus);
    },
    addPage(state, page) {
      state.pages.push(Object.freeze(page));
    },
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUserInfo: (state) => state.userInfo,
    getLastLoginInfo: (state) => state.lastLoginInfo,
    getConfigs: (state) => state.configs,
    getConfig: (state) => (configurationId) => find(state.configs, { configurationId }),
    getNotices: (state) => state.notices,
    getLinkPage: (state) => (pageId, linkPageId) => find(state.linkPages, { pageId, linkPageId }),
    getApps: (state) => state.apps,
    getApp: (state) => (applicationId) => find(state.apps, { applicationId }),
    getAppMenus: (state) => (applicationId) => filter(state.menus, { applicationId }),
    getMenus: (state) => state.menus,
    getMenu: (state) => (menuUid) => find(state.menus, { menuUid }),
    getPages: (state) => state.pages,
    getPage: (state) => (key) => find(state.pages, (v) => v.pageId === key || v.pageDestinationValue === key),
  },

  actions: {
    async fetchLoginInfo({ commit }) {
      const response = await http.post('/api/v1/security/login-info');
      const loginInfo = response.data;

      const {
        userInfo, lastLoginInfo, configs, notices, linkPages,
      } = loginInfo;

      commit('setLoginInfo', { userInfo, lastLoginInfo });
      commit('setConfigs', configs);
      commit('setNotices', notices);
      commit('setLinkPages', linkPages);

      return loginInfo;
    },
    async fetchApps({ commit }) {
      const response = await http.get('/api/v1/common/portal/applications');
      const apps = response.data;

      commit('setApps', apps);
    },
    async fetchMenus({ commit, getters }) {
      const response = await http.get('/api/v1/common/portal/menus');

      const apps = getters.getApps;
      const menus = response.data;

      replaceRoutesByMenus(apps, menus);
      commit('setMenus', menus);
    },
    async fetchPage({ commit, getters }, pageId) {
      const isCached = !!getters.getPage(pageId);

      if (!isCached) {
        const response = await http.get(`/api/v1/common/meta/${pageId}`);
        const { pageInfo: page } = response.data;

        commit('addPage', page);
      }
    },
  },
};
