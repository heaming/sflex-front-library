import { Platform, openURL, uid } from 'quasar';
import { isEmpty } from 'lodash-es';
import store from '../store';
import pascalCase from './private/pascalCase';

const path = window.location.hash.split('?')[0];
const name = `${pascalCase(path)}P`;
const openedPopups = {};

let globalMessageEvent;
let globalCloseEvent;

function registerMessageEvent() {
  globalMessageEvent = (e) => {
    const { pid, result, payload, shouldPostMessage } = e.data;
    if (pid && openedPopups[pid] && shouldPostMessage) {
      const resolve = openedPopups[pid];
      delete openedPopups[pid];

      if (Object.keys(openedPopups).length === 0 && !isEmpty(payload)) {
        window.removeEventListener('message', globalMessageEvent, false);
        globalMessageEvent = null;
      }

      setTimeout(() => {
        resolve({
          result: result === true,
          payload,
        });
      });
    }
  };

  window.addEventListener('message', globalMessageEvent, false);
}

function registerOpenedPopup(pid, resolve) {
  if (!globalMessageEvent) {
    registerMessageEvent();
  }

  openedPopups[pid] = resolve;
}

function calculateCenterTopLeft(width, height) {
  const fullWidth = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
  const fullHeight = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
  const zoom = fullWidth / window.screen.availWidth;
  const otherScreenLeft = window.screenLeft ?? window.screenX;
  const otherScreenTop = window.screenTop ?? window.screenY;

  const left = (fullWidth - parseInt(width, 10)) / 2 / zoom + otherScreenLeft;
  const top = (fullHeight - parseInt(height, 10)) / 2 / zoom + otherScreenTop;

  return { left, top };
}

function parseFeatures(windowFeatures) {
  const parsedFeatures = {};
  const features = {
    popup: true,
    noopener: false,
    noreferrer: false,
    menubar: false,
    status: false,
    titlebar: false,
    ...windowFeatures,
  };

  const { width, height } = features;
  const shouldCalculateCenter = Platform.is.desktop && width && height;

  if (shouldCalculateCenter) {
    Object.assign(features, {
      ...calculateCenterTopLeft(width, height),
    });
  }

  Object.keys(features).forEach((key) => {
    const value = features[key];
    if (typeof value === 'boolean') {
      parsedFeatures[key] = value;
    } else {
      parsedFeatures[`${key}=${value}`] = true;
    }
  });
  return parsedFeatures;
}

export async function open(url, windowFeatures, params = null) {
  return new Promise((resolve, reject) => {
    const {
      origin,
      pathname,
      search,
      hash,
    } = new URL(url, /^https?:\/\//.test(url) ? undefined : window.location.origin);

    const pid = uid();
    let urlWithUid;
    if (params && typeof params === 'object') {
      let paramUrl = '';
      Object.keys(params).forEach((key) => {
        paramUrl += `&${key}=${params[key]}`;
      });
      urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${paramUrl.trim().length > 0 ? paramUrl : ''}${hash}`;
    } else urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${hash}`;

    openURL(urlWithUid, () => {
      reject(
        new Error('pop-up open failed, check whether your browser blocks pop-ups.'),
      );
    }, parseFeatures(windowFeatures));

    registerOpenedPopup(pid, resolve);
  });
}

function close(result, payload, forceClose = true) {
  const pid = new URLSearchParams(window.location.search).get('pid');
  const isExternallyAccessible = store.getters['meta/getPage'](name)?.pageExtAccYn === 'Y';
  const targetOrigin = isExternallyAccessible ? '*' : undefined;
  window.opener?.postMessage({
    pid, result, payload,
  }, targetOrigin);

  if (forceClose) {
    if (globalCloseEvent) {
      window.removeEventListener('beforeunload', globalCloseEvent, false);
      globalCloseEvent = null;
    }

    window.close();
  }
}

export function registerCloseEvent() {
  globalCloseEvent = () => {
    close(false, undefined, false);
  };

  window.addEventListener('beforeunload', globalCloseEvent, false);
}

export function ok(payload) {
  close(true, payload);
}

export function cancel(payload) {
  close(false, payload);
}
