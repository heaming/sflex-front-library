import { Quasar } from 'quasar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import consts from '../consts';
import env from '../consts/private/env';
import { http } from '../plugins/http';
import { loadSpinner } from '../plugins/loading';
import { localStorage } from '../plugins/storage';
// import { getOsTypeCode, getDeviceTypeCode, getDeviceToken } from '../utils/mobile';
import { isReady as routerIsReady } from '../router';

export default () => {
  const store = useStore();
  const i18n = useI18n();

  async function fetchLoginInfoImsi() {
    const { userInfo } = await store.dispatch('meta/fetchLoginInfoImsi');
    const { langId } = userInfo;

    i18n.locale.value = langId;
    Quasar.locale = langId;
    dayjs.locale(langId);
  }

  async function fetchLoginInfo() {
    const { userInfo } = await store.dispatch('meta/fetchLoginInfo');
    const { langId } = userInfo;

    i18n.locale.value = langId;
    Quasar.locale = langId;
    dayjs.locale(langId);
  }

  async function fetchMetas() {
    await Promise.all([
      store.dispatch('meta/fetchApps'),
      store.dispatch('meta/fetchMenus'),
      store.dispatch('meta/fetchBookmarks'),
      store.dispatch('meta/fetchAlarms'),
    ]);
  }

  async function fetchLangs() {
    const locale = i18n.locale.value;
    const response = await http.get('/sflex/common/common/multi-languages', {
      params: {
        langId: locale,
        multiLanguageTypeCode: 'MSSG',
      },
    });

    const localeMessages = response.data
      .reduce((a, e) => { a[e.id] = e.text; return a; }, {});

    i18n.mergeLocaleMessage(locale, localeMessages);
  }

  // async function saveDeviceTokenIfNeeded() {
  //   const data = {
  //     userId: store.getters['meta/getUserInfo'].userId,
  //     osTypeCode: getOsTypeCode(),
  //     deviceTypeCode: getDeviceTypeCode(),
  //     pushDeviceTokenValue: await getDeviceToken().catch(() => null),
  //   };
  //   const shouldIgnore = Object.values(data).some((e) => !e);
  //
  //   if (!shouldIgnore) {
  //     await http.post('/sflex/common/common/push-users', data);
  //   }
  // }
  /**
   * TODO: 삭제
   */
  async function initSessionImsi() {
    try {
      loadSpinner(true);
      await fetchLoginInfoImsi();
      await Promise.all([
        fetchMetas(),
        fetchLangs(),
        // saveDeviceTokenIfNeeded(),
      ]);
    } finally {
      loadSpinner(false);
    }
  }
  async function initSession() {
    try {
      loadSpinner(true);
      await fetchLoginInfo();
      await Promise.all([
        fetchMetas(),
        fetchLangs(),
        // saveDeviceTokenIfNeeded(),
      ]);
    } finally {
      loadSpinner(false);
    }
  }

  const locationReplace = (url = window.location.pathname) => window.location.replace(url);

  async function isReady() {
    if (localStorage.has(consts.LOCAL_STORAGE_ACCESS_TOKEN)) {
      await initSession();
      await routerIsReady();
    } else if (env.VITE_LOGIN_URL && !env.VITE_HTTP_CUST_ORIGIN) {
      const res = await http.get(env.VITE_SSO_HEALTH_CHECK_URL);
      if (res.data) {
        locationReplace(env.VITE_LOGIN_URL); // redirect to sso
      }
    }
  }

  async function login({ tenantId, portalId, languageId, loginId, password }) {
    const data = {
      tenantId: tenantId || env.VITE_TENANT_ID,
      portalId: portalId || env.VITE_PORTAL_ID,
      languageId: languageId || i18n.locale.value,
      loginId,
      password,
    };

    const response = await http.post(`${consts.HTTP_ORIGIN}/certification/simple-login`, data);
    const { token } = response.data;
    localStorage.set(consts.LOCAL_STORAGE_ACCESS_TOKEN, token);
    locationReplace();
  }

  function logout() {
    if (env.VITE_LOGOUT_URL) {
      locationReplace(env.VITE_LOGOUT_URL);
    } else {
      localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
      locationReplace();
    }
  }

  const isAuthenticated = computed(() => store.getters['meta/isAuthenticated']);

  return {
    isAuthenticated,
    isReady,
    login,
    logout,
    initSessionImsi,
  };
};
