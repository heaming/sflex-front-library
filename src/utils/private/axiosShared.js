import { stringify } from 'qs';
import { isEmpty, keys } from 'lodash-es';

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

export function isServerError(response) {
  const serverErrorKeys = ['code', 'errorMessage', 'errorType'];
  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(response.data || {});

  return serverErrorKeys.every(hasOwnProperty);
}

export function buildURL(...partials) {
  const [schema = ''] = partials[0].match(/^https?:\/\//) || [];
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
