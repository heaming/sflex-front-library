import { filter, find } from 'lodash-es';
import consts from '../../consts';
import { http } from '../../plugins/http';
import { localStorage } from '../../plugins/storage';
import { replaceRoutesByMenus } from '../../utils/private/router';

export default {
  namespaced: true,

  state: () => ({
    isAuthenticated: false,
    accessToken: null,
    userInfo: {},
    lastLoginInfo: {},
    configs: [],
    notices: [],
    linkPages: [],
    apps: [],
    menus: [],
    pages: [],
  }),

  mutations: {
    setLoginInfo(state, { accessToken, userInfo, lastLoginInfo }) {
      state.isAuthenticated = true;
      state.accessToken = accessToken;
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
    setMenus(state, menus) {
      state.menus = Object.freeze(menus);
    },
    addPage(state, page) {
      state.pages.push(Object.freeze(page));
    },
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getAccessToken: (state) => state.accessToken,
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
      const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
      const response = await http.post('/api/v1/security/login-info', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const loginInfo = response.data;
      const { userInfo, lastLoginInfo, configs, notices, linkPages } = loginInfo;

      userInfo.dateFormat ||= consts.DEFAULT_DATE_FORMAT;
      userInfo.timeFormat ||= consts.DEFAULT_TIME_FORMAT;
      userInfo.datetimeFormat = `${userInfo.dateFormat} ${userInfo.timeFormat}`;

      commit('setLoginInfo', { accessToken, userInfo, lastLoginInfo });
      commit('setConfigs', configs);
      commit('setNotices', notices);
      commit('setLinkPages', linkPages);

      return loginInfo;
    },
    async fetchApps({ commit, dispatch }) {
      const response = await http.get('/api/v1/common/portal/applications');
      const apps = response.data;

      commit('setApps', apps);
      dispatch('app/createGnbItems', apps, { root: true });
    },
    async fetchMenus({ commit, getters, dispatch }) {
      const response = await http.get('/api/v1/common/portal/menus');

      const apps = getters.getApps;
      const menus = response.data;

      commit('setMenus', menus);
      dispatch('app/createLnbItems', menus, { root: true });
      replaceRoutesByMenus(apps, menus);
    },
    async fetchPage({ commit, getters }, pageDestinationValue) {
      const isCached = getters.getPage(pageDestinationValue) !== undefined;

      if (!isCached) {
        const response = await http.get(`/api/v1/common/new-meta/${pageDestinationValue}`);
        const { pageInfo, ...pageMeta } = response.data;
        const page = { ...pageInfo, ...pageMeta };

        commit('addPage', page);
      }
    },
  },
};
