import { Quasar } from 'quasar';
import consts from '../consts';
import { http } from '../plugins/http';
import { localStorage } from '../plugins/storage';
import { INITIAL_LOCATION } from '../router';

export default () => {
  const store = useStore();
  const i18n = useI18n();
  const router = useRouter();

  async function fetchLoginInfo() {
    const { userInfo } = await store.dispatch('meta/fetchLoginInfo');
    const { displayLangId } = userInfo;

    i18n.locale.value = displayLangId;
    Quasar.locale = displayLangId;
  }

  async function fetchMetas() {
    await Promise.all([
      store.dispatch('meta/fetchApps'),
      store.dispatch('meta/fetchMenus'),
    ]);
  }

  async function fetchLangs() {
    const locale = i18n.locale.value;
    const response = await http.get('/api/v1/common/multi-languages', {
      params: {
        langId: locale,
        multiLanguageTypeCode: 'MSSG',
      },
    });

    const localeMessages = response.data
      .reduce((a, e) => { a[e.multiLanguageId] = e.multiLanguageContent; return a; }, {});

    i18n.mergeLocaleMessage(locale, localeMessages);
  }

  async function invokeInitialRoute() {
    await router.isReady();
    await router.replace(INITIAL_LOCATION);
  }

  async function isReady() {
    try {
      await fetchLoginInfo();
      await Promise.all([
        fetchMetas(),
        fetchLangs(),
      ]);
      await invokeInitialRoute();
    } catch (e) {
      console.error(e);
    }
  }

  async function login(loginId, password) {
    const response = await http.post('/certification/simple-login', { loginId, password });
    const { token } = response.data;
    localStorage.set(consts.LOCAL_STORAGE_ACCESS_TOKEN, token);
    window.location.replace('/');
  }

  async function logout() {
    //
  }

  return {
    isReady,
    login,
    logout,
  };
};
