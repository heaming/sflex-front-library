import { Quasar } from 'quasar';
import consts from '../consts';
import env from '../consts/private/env';
import { http } from '../plugins/http';
import { loadSpinner } from '../plugins/loading';
import { localStorage } from '../plugins/storage';
import { isReady as routerIsReady } from '../router';

export default () => {
  const store = useStore();
  const i18n = useI18n();

  async function fetchLoginInfo() {
    const { userInfo } = await store.dispatch('meta/fetchLoginInfo');
    const { langId } = userInfo;

    i18n.locale.value = langId;
    Quasar.locale = langId;
  }

  async function fetchMetas() {
    await Promise.all([
      store.dispatch('meta/fetchApps'),
      store.dispatch('meta/fetchMenus'),
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
      .reduce((a, e) => { a[e.multiLanguageId] = e.multiLanguageContent; return a; }, {});

    i18n.mergeLocaleMessage(locale, localeMessages);
  }

  async function initSession() {
    try {
      loadSpinner(true);
      await fetchLoginInfo();
      await Promise.all([
        fetchMetas(),
        fetchLangs(),
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
    } else if (env.VITE_LOGIN_URL) {
      locationReplace(env.VITE_LOGIN_URL); // redirect to sso
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
  };
};
