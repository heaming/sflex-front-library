import { uid } from 'quasar';
import dayjs from 'dayjs';
import consts from '../consts';
import store from '../store';

export function getByte(s, bytesPerKoChar = 3) {
  return Array.from(s).reduce((a, v) => a + (v.charCodeAt() > 127 ? bytesPerKoChar : 1), 0);
}

export function getMaxByteLength(s, maxBytes = 0, bytesPerKoChar = 3) {
  if (maxBytes > 0) {
    for (let i = 0, sum = 0; i < s.length; i += 1) {
      sum += s[i].charCodeAt() > 127 ? bytesPerKoChar : 1;
      if (sum > maxBytes) { return i; }
    }
  }
  return s.length;
}

export function getMaxByteString(s, maxBytes = 0, bytesPerKoChar = 3) {
  const i = getMaxByteLength(s, maxBytes, bytesPerKoChar);
  return s.substring(0, i);
}

export function isOverByte(s, maxBytes = 0, bytesPerKoChar = 3) {
  return maxBytes > 0 && getByte(s, bytesPerKoChar) > maxBytes;
}

export function getNumberWithComma(s, decimalLimit = -1) {
  const x = s.toString().split('.');
  x[0] = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (x[1] && decimalLimit > -1) {
    x[1] = x[1].substring(0, decimalLimit);
  }

  return x.join('.');
}

export function getUid(prefix) {
  const id = uid().toUpperCase();
  return prefix ? `${prefix}-${id}` : id;
}

export function getDateFormat(value, format = 'YYYYMMDD') {
  const dateFormat = store.getters['meta/getUserInfo'].dateFormat || consts.DEFAULT_DATE_FORMAT;
  return value ? dayjs(value, format).format(dateFormat) : '';
}

export function getDatetimeFormat(value, format = 'YYYYMMDDHHmmss') {
  const datetimeFormat = store.getters['meta/getUserInfo'].datetimeFormat || consts.DEFAULT_DATETIME_FORMAT;
  return value ? dayjs(value, format).format(datetimeFormat) : '';
}

export function getTimeFormat(value, format = 'HHmmss') {
  const timeFormat = store.getters['meta/getUserInfo'].timeFormat || consts.DEFAULT_TIME_FORMAT;
  return value ? dayjs(value, format).format(timeFormat) : '';
}
