import { AxiosError } from 'axios';
import { omitBy, isNil } from 'lodash-es';
import consts from '../../consts';
import env from '../../consts/private/env';
import store from '../../store';
import { loadSpinner } from '../../plugins/loading';
import { localStorage } from '../../plugins/storage';
import { alert } from '../../plugins/dialog';
import i18n from '../../i18n';
import { blobToData, isServerError, showStackTraceLog } from './axiosShared';

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

  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
}

/*
  Response Success
  */
export function handleSuccess(response) {
  const { config } = response;

  if (config.spinner) {
    loadSpinner(false);
  }

  return response;
}

/*
  Response Failure
  */
const SESSION_EXPIRED_REPLACE_URL = env.VITE_LOGIN_URL || window.location.pathname;
const ENABLE_STACK_TRACE_LOG = env.DEV || env.MODE === 'dev' || env.MODE === 'qa';

async function handleServerFailureSessionExpired() {
  await alert(i18n.t('MSG_ALT_ERR_SESSION_EXPIRED'));
  localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
  window.location.replace(SESSION_EXPIRED_REPLACE_URL);
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

async function handleServerFailure(response) {
  const { data } = response;

  switch (data.errorType) {
    case consts.HTTP_ERROR_SESSION_EXPIRED:
      await handleServerFailureSessionExpired(); break;
    case consts.HTTP_ERROR_BIZ:
      await handleServerFailureBiz(response); break;
    default:
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
      await handleServerFailure(response);
      throw error;
    }
  } else if (request) {
    // The request was made but no response was received

    if (error.code === AxiosError.ETIMEDOUT) {
      await alert(i18n.t('MSG_ALT_ERR_TIMEOUT'));
      throw error;
    }
  }

  await alert(i18n.t('MSG_ALT_ERR_CONTACT_ADMIN'));
  throw error;
}
