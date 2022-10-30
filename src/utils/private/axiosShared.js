import { stringify } from 'qs';
import { isEmpty, keys } from 'lodash-es';
import { modal } from '../../plugins/modal';

export function createParamsSerializer() {
  const skipTypes = ['object', 'undefined'];

  function skip(value) {
    return (skipTypes.includes(typeof value) || Array.isArray(value))
      ? isEmpty(value) : false;
  }

  return (params) => keys(params).reduce((querystring, key) => {
    const value = params[key];

    if (!skip(value)) {
      querystring = `${querystring}${querystring ? '&' : ''}`;

      if (Array.isArray(value)) {
        const encodedValue = stringify({ [key]: value }, { arrayFormat: 'repeat' });
        querystring += encodedValue;
      } else {
        const encodedValue = encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value);
        querystring += `${key}=${encodedValue}`;
      }
    }

    return querystring;
  }, '');
}

export function blobToData(blob) {
  return new Promise((resolve) => {
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
}

export function isServerError(response) {
  const serverErrorKeys = ['code', 'errorMessage', 'errorType'];
  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(response.data || {});

  return serverErrorKeys.every(hasOwnProperty);
}

export function buildURL(...partials) {
  const [schema = ''] = partials[0]?.match(/^https?:\/\//) || [];
  const combines = [];

  if (schema) {
    combines.push(
      partials[0].substring(schema.length),
      ...partials.splice(1),
    );
  } else {
    combines.push('/', ...partials);
  }

  return `${schema}${combines.join('/').replace(/\/+/g, '/')}`;
}

export async function showStackTraceLog(errorMessage, errorDetailMessage) {
  await modal({
    component: () => import('../../pages/StackTraceLog.vue'),
    componentProps: {
      errorMessage,
      errorDetailMessage,
    },
  });
}
