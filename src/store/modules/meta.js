import { filter, find, some } from 'lodash-es';
import consts from '../../consts';
import { http } from '../../plugins/http';
import { localStorage } from '../../plugins/storage';

const recursiveCreateMenuPath = (menus, menuUid) => {
  const navigations = [];
  const matched = find(menus, { menuUid });

  if (matched) {
    navigations.push(
      ...recursiveCreateMenuPath(menus, matched.parentsMenuUid),
      { key: menuUid, label: matched.menuName },
    );
  }
  return navigations;
};

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
    bookmarks: [],
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
    setBookmarks(state, bookmarks) {
      state.bookmarks = Object.freeze(bookmarks);
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
    getMenuPath: (state) => (menuUid) => recursiveCreateMenuPath(state.menus, menuUid),
    getBookmarks: (state) => state.bookmarks,
    isBookmarked: (state) => (menuUid, pageId) => some(state.bookmarks, { menuUid, pageId }),
    getPages: (state) => state.pages,
    getPage: (state) => (key) => find(state.pages, (v) => (
      v.pageId === key || v.fromPageId === key || v.pageDestinationValue === key
    )),
  },

  actions: {
    async fetchLoginInfo({ commit }) {
      const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
      const response = await http.post('/sflex/common/common/login-info', null, {
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
      const response = await http.get('/sflex/common/common/portal/applications');
      const apps = response.data;

      commit('setApps', apps);
      dispatch('app/createGlobalApps', apps, { root: true });
    },
    async fetchMenus({ commit, dispatch }) {
      const response = await http.get('/sflex/common/common/portal/menus');
      const menus = response.data;

      commit('setMenus', menus);
      dispatch('app/createGlobalMenus', menus, { root: true });
    },
    async fetchBookmarks({ commit }) {
      const response = await http.get('/sflex/common/common/bookmarks');
      const bookmarks = response.data;

      commit('setBookmarks', bookmarks);
    },
    async fetchBookmark({ getters, dispatch }, { menuUid, pageId }) {
      const params = { menuUid, pageId };
      const response = await http.get('/sflex/common/common/bookmarks/marked', { params });
      const marked = response.data;

      const shouldReload = marked !== getters.isBookmarked(menuUid, pageId);

      if (shouldReload) {
        await dispatch('fetchBookmarks');
      }
    },
    async createBookmark({ dispatch }, { menuUid, pageId, bookmarkName }) {
      await http.post('/sflex/common/common/bookmarks', { menuUid, pageId, bookmarkName });
      await dispatch('fetchBookmarks');
    },
    async deleteBookmark({ dispatch }, { menuUid, pageId }) {
      const params = { menuUid, pageId };
      await http.delete('/sflex/common/common/bookmarks', { params });
      await dispatch('fetchBookmarks');
    },
    async fetchPage({ commit, getters }, pageKey) {
      const isCached = getters.getPage(pageKey) !== undefined;

      if (!isCached) {
        const response = await http.get(`/sflex/common/common/meta/${pageKey}`);
        const { pageInfo, ...pageMeta } = response.data;
        const page = { ...pageInfo, ...pageMeta };

        commit('addPage', page);
      }
    },
  },
};
