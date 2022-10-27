import { AxiosError } from 'axios';
import { omitBy, isNil } from 'lodash-es';
import consts from '../../consts';
import env from '../../consts/private/env';
import store from '../../store';
import { loadSpinner } from '../../plugins/loading';
import { localStorage } from '../../plugins/storage';
import { alert } from '../../plugins/dialog';
import { isServerError } from './axiosShared';
import i18n from '../../i18n';

const blobToData = (blob) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', (evt) => {
    try {
      resolve(
        blob.type === 'application/json'
          ? JSON.parse(evt.target.result) : evt.target.result,
      );
    } catch {
      resolve(blob);
    }
  });
  reader.readAsText(blob, 'utf-8');
});

const normalizeConfig = (config) => ({
  ...config,
  spinner: config.spinner !== false,
  alert: config.alert !== false,
});

export function handleConfig(config) {
  config = normalizeConfig(config);
  config.headers = omitBy(config.headers, isNil);

  if (config.spinner) {
    loadSpinner(true);
  }

  // set header Authorization
  const isAuthenticated = store.getters['meta/isAuthenticated'];
  const accessToken = store.getters['meta/getAccessToken'];

  if (isAuthenticated) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

export function handleSuccess(response) {
  const { config } = response;

  if (config.spinner) {
    loadSpinner(false);
  }

  return response;
}

async function handleServerFailure(response) {
  const { data, config } = response;
  const isSessionExpired = data.errorType === consts.HTTP_ERROR_TYPE_SESSION_EXPIRED;

  if (isSessionExpired) {
    await alert(i18n.t('MSG_ALT_ERR_SESSION_EXPIRED'));
    localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
    window.location.replace(env.VITE_LOGIN_URL || window.location.pathname);
    return;
  }

  const isBizError = data.errorType === consts.HTTP_ERROR_TYPE_BIZ;
  const shouldAlert = !isBizError || config.alert;

  if (shouldAlert) {
    await alert(data.errorMessage || i18n.t('MSG_ALT_ERR_CONTACT_ADMIN'));
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
