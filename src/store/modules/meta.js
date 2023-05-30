/* eslint-disable max-len */
import { filter, find, some, map } from 'lodash-es';
import consts from '../../consts';
import { http } from '../../plugins/http';
import { localStorage } from '../../plugins/storage';

const recursiveCreateMenuPaths = (state, menuUid) => {
  const navigations = [];
  const matched = find(state.menus, { menuUid });

  if (matched) {
    const {
      applicationId,
      menuLevel,
      menuName,
      parentsMenuUid,
    } = matched;

    if (menuLevel === 0) {
      const { applicationName } = find(state.apps, { applicationId }) || {};

      navigations.push(
        { key: applicationId, label: applicationName, menuLevel },
        { key: menuUid, label: menuName, menuLevel },
      );
    } else {
      navigations.push(
        ...recursiveCreateMenuPaths(state, parentsMenuUid),
        { key: menuUid, label: menuName, menuLevel },
      );
    }
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
    totalMenus: [],
    pages: [],
    noMenuPages: [],
    bookmarks: [],
    recentMenus: [],
    isLocatedFromHistory: false,
    alarms: [],
  }),

  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setLoginInfo(state, { accessToken, userInfo, lastLoginInfo }) {
      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.userInfo = Object.freeze(userInfo);
      state.lastLoginInfo = Object.freeze(lastLoginInfo);
      // ENC
      // const reLoginInfo = `${userInfo.tenantId}|${userInfo.portalId}|${userInfo.loginId}`;
      // const iv = CryptoJS.enc.Hex.parse('');
      // const key = CryptoJS.enc.Utf8.parse('KSTATION-ENC-AES-256-2023-195817');
      // const cipher = CryptoJS.AES.encrypt(reLoginInfo, key, { iv });
      localStorage.set('reLoginInfo', userInfo);
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
    setTotalMenus(state, menus) {
      state.totalMenus = Object.freeze(menus);
    },
    setNoMenuPages(state, noMenuPages) {
      state.noMenuPages = Object.freeze(noMenuPages);
    },
    addPage(state, page) {
      state.pages.push(Object.freeze(page));
    },
    setBookmarks(state, bookmarks) {
      state.bookmarks = Object.freeze(bookmarks);
    },
    setRecentMenus(state, recentMenus) {
      state.recentMenus = Object.freeze(recentMenus);
    },
    setIsLocatedFromHistory(state, isLocatedFromHistory) {
      state.isLocatedFromHistory = isLocatedFromHistory;
    },
    setAlarms(state, alarms) {
      state.alarms = Object.freeze(alarms);
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
    getTotalMenus: (state) => state.totalMenus,
    getMenu: (state) => (menuUid) => find(state.menus, { menuUid }),
    getMenuPaths: (state) => (menuUid) => recursiveCreateMenuPaths(state, menuUid),
    getPages: (state) => state.pages,
    getNoMenuPages: (state) => state.noMenuPages,
    getNoMenuPage: (state) => (pageId) => find(state.noMenuPages, { pageId }),
    getPage: (state) => (key) => find(state.pages, (v) => (v.pageId === key || v.fromPageId === key || v.pageDestinationValue === key)),
    getBookmarks: (state) => state.bookmarks,
    isBookmarked: (state) => (menuUid, pageId) => some(state.bookmarks, { menuUid, pageId }),
    getRecentMenus: (state) => state.recentMenus,
    getIsLocatedFromHistory: (state) => state.isLocatedFromHistory,
    getAlarms: (state) => state.alarms,
  },

  actions: {
    /**
     * TODO: 삭제요망 임시 세션변경임.
     */
    async fetchLoginInfoImsi({ commit }) {
      const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
      const response = await http.post('/sflex/common/common/login-info-imsi', null, {
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
      const menuPageRes = await http.get('/sflex/common/common/portal/menus');
      const menus = menuPageRes.data.map((e) => ({
        ...e,
        parentsMenuUid: e.parentsMenuUid?.trim() || null,
      }));

      // 메뉴와 상관없이 무조건 라우팅해야되는 페이지들을 긁어옴.
      const noMenuPageRes = await http.get('/sflex/common/common/meta/no-menu-pages');
      const noMenuPages = noMenuPageRes.data;
      commit('setNoMenuPages', noMenuPages);

      // 전체메뉴 가져옴
      const menuPageWithOutAuthRes = await http.get('/sflex/common/common/portal/menus-without-auth');
      commit('setTotalMenus', menuPageWithOutAuthRes);

      commit('setMenus', menus);
      dispatch('app/createGlobalMenus', menus, { root: true });
    },
    async fetchPage({ commit, getters }, pageKey) {
      const isCached = getters.getPage(pageKey) !== undefined;

      if (!isCached) {
        const response = await http.get(`/sflex/common/common/meta/${pageKey}`);
        const { pageInfo, ...others } = response.data;
        const page = { ...pageInfo, ...others };

        commit('addPage', page);
      }
    },
    async fetchBookmarks({ commit, getters }) {
      const response = await http.get('/sflex/common/common/bookmarks');
      const bookmarks = response.data.map((e) => {
        const menuPaths = map(getters.getMenuPaths(e.menuUid), 'label');
        const menuPath = menuPaths.splice(0, menuPaths.length - 1).join(' > ');
        return { ...e, menuPath };
      });

      commit('setBookmarks', bookmarks);
    },
    async fetchRecentMenus({ commit, getters }) {
      const response = await http.get('/sflex/common/common/portal/recent-menus', { silent: true });
      const recentMenus = response.data.map((e) => {
        const menuPaths = map(getters.getMenuPaths(e.menuUid), 'label');
        const menuPath = menuPaths.splice(0, menuPaths.length - 1).join(' > ');
        return { ...e, menuPath };
      });

      commit('setRecentMenus', recentMenus);
    },
    fetchLocatedFromHistory({ commit }, data) {
      commit('setIsLocatedFromHistory', data);
    },
    async fetchAlarms({ commit }) {
      const res = await http.get('/sflex/common/common/alarm');
      commit('setAlarms', res.data);
    },

    async changeAccessToken({ commit }, data) {
      commit('setAccessToken', data);
    },
  },
};
