import { AxiosError } from 'axios';
import { omitBy, isNil } from 'lodash-es';
import dayjs from 'dayjs';
import consts from '../../consts';
import env from '../../consts/private/env';
import store from '../../store';
import { loadSpinner } from '../../plugins/loading';
import { localStorage } from '../../plugins/storage';
import { alert } from '../../plugins/dialog';
import { modal } from '../../plugins/modal';
import { notify } from '../../plugins/notify';
import { platform } from '../../plugins/platform';
import i18n from '../../i18n';
import { blobToData, isServerError, showStackTraceLog } from './axiosShared';
import { closeWaffleApp } from '../mobile';

const isWaple = computed(() => env.VITE_TENANT_ID === 'TNT_EDU' && env.VITE_PORTAL_ID === 'MBL_DEF');

/*
  Request
  */
export function handleConfig(config) {
  config = {
    ...config,
    headers: omitBy(config.headers, isNil),
    spinner: config.silent !== true && config.spinner !== false,
    alert: config.silent !== true && config.alert !== false,
  };

  if (config.spinner) {
    loadSpinner(true);
  }

  // set header Authorization
  const isAuthenticated = store.getters['meta/isAuthenticated'];
  const accessToken = store.getters['meta/getAccessToken'];

  if (isAuthenticated) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // FIXME : 테스트용
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
}

/*
  Response Success
  */
export function handleSuccess(response) {
  const { config } = response;

  if (config?.spinner) {
    loadSpinner(false);
  }
  const lastTransactionTime = dayjs().format('YYYYMMDDHHmmss');
  localStorage.set('lastTransactionTime', lastTransactionTime);

  return response;
}

/*
  Response Failure
  */
const SESSION_EXPIRED_REPLACE_URL = env.VITE_LOGIN_URL || window.location.pathname;
const ENABLE_STACK_TRACE_LOG = env.DEV || env.MODE === 'dev' || env.MODE === 'qa';

async function handleServerFailureSessionDuplicated() {
  localStorage.remove('reLoginInfo');
  localStorage.remove('lastTransactionTime');
  localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
  await alert(i18n.t('MSG_ALT_ERR_DUPLICATE_SESSION'), { icon: 'warning_24' });
  window.location.replace(SESSION_EXPIRED_REPLACE_URL);
}

async function handleServerFailureSessionExpired(response) {
  const { config } = response;
  if (config?.spinner) {
    loadSpinner(false);
  }

  // EDU WAPLE 일 경우
  if (isWaple.value) {
    alert('화면 로딩에 문제가 발생했습니다. 창을 닫고 다시 시도 해주세요.');
    localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.remove('reLoginInfo');
    localStorage.remove('lastTransactionTime');
    closeWaffleApp();
    return;
  }

  const now = dayjs();
  const reLoginInfoStr = localStorage.getItem('reLoginInfo');
  const lastTransactionTimeStr = localStorage.getItem('lastTransactionTime');
  const lastTransactionTime = dayjs(lastTransactionTimeStr, 'YYYYMMDDHHmmss');
  const diff = now.diff(lastTransactionTime, 'h', true);
  if (lastTransactionTimeStr === null || reLoginInfoStr === null || diff >= 8) {
    localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.remove('reLoginInfo');
    localStorage.remove('lastTransactionTime');
    await alert(i18n.t('MSG_ALT_ERR_SESSION_EXPIRED'), { icon: 'warning_24' });
    window.location.replace(SESSION_EXPIRED_REPLACE_URL);
  } else {
    // 8시간이 안지났으면 그냥 비번묻는 로그인창이 뜬다.
    let result;
    if (platform.is.mobile) {
      result = await modal({
        component: () => import('../../pages/mobile/MobileReLoginP.vue'),
      });
    } else if (platform.is.tablet) {
      result = await modal({
        component: () => import('../../pages/tablet/TabletReLoginP.vue'),
      });
    } else {
      result = await modal({
        component: () => import('../../pages/web/WebReLoginP.vue'),
      });
    }
    if (result.payload) {
      localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
      // localStorage.remove('reLoginInfo');
      localStorage.remove('lastTransactionTime');
      localStorage.set(consts.LOCAL_STORAGE_ACCESS_TOKEN, result.payload);
      await store.dispatch('meta/changeAccessToken', result.payload);
      // 현재 메인이면 reload시킨다.
      if (window.location.href.length === window.location.href.indexOf('/#/') + 3) {
        window.location.reload();
      } else {
        notify('login 되었습니다. 다시 시도해주세요');
      }
    } else {
      localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
      localStorage.remove('reLoginInfo');
      localStorage.remove('lastTransactionTime');
      await alert('로그인에 실패하였습니다.');
      window.location.reload();
    }
  }
}

async function handleServerFailureBiz(response) {
  const { config, data } = response;

  if (config.alert) {
    await alert(data.errorMessage);
  }
}

async function handleServerFailureDefault(response) {
  const {
    errorMessage,
    errorDetailMessage,
  } = response.data;

  if (ENABLE_STACK_TRACE_LOG && errorDetailMessage) {
    // do not set await
    // modal is lower z-index than spinner
    showStackTraceLog(errorMessage, errorDetailMessage);
  } else {
    await alert(errorMessage);
  }
}

async function handleServerFailure(error) {
  const { config, response } = error;
  const { data } = response;

  switch (data.errorType) {
    case consts.HTTP_ERROR_SESSION_DUPLICATION:
      await handleServerFailureSessionDuplicated(response); break;
    case consts.HTTP_ERROR_SESSION_EXPIRED:
      await handleServerFailureSessionExpired(response); break;
    case consts.HTTP_ERROR_BIZ:
      await handleServerFailureBiz(response); break;
    default:
      if (config?.skipServerFailureDefault) {
        throw error;
      }
      await handleServerFailureDefault(response);
  }
}

export async function handleFailure(error) {
  const { config, response, request } = error;

  if (config?.spinner) {
    loadSpinner(false);
  }

  if (response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // fix blob data
    if (config.responseType === 'blob') {
      response.data = await blobToData(response.data);
    }

    if (isServerError(response)) {
      await handleServerFailure(error);
      throw error;
    }
  } else if (request) {
    // The request was made but no response was received

    if (error.code === AxiosError.ETIMEDOUT) {
      await alert(i18n.t('MSG_ALT_ERR_TIMEOUT'));
      throw error;
    }
  }

  // Gateway timeout 처리
  if (response?.status === 504) {
    await alert(i18n.t('MSG_ALT_ERR_TIMEOUT'));
    throw error;
  }

  await alert(i18n.t('MSG_ALT_ERR_CONTACT_ADMIN'));
  throw error;
}
