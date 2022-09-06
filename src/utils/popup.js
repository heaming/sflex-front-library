import { Platform, openURL, uid } from 'quasar';

const openedPopups = {};

let globalMessageEvent;
let globalCloseEvent;

function registerMessageEvent() {
  globalMessageEvent = (e) => {
    const { pid, result, payload } = e.data;

    if (pid && openedPopups[pid]) {
      const resolve = openedPopups[pid];
      delete openedPopups[pid];

      if (Object.keys(openedPopups).length === 0) {
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

  const left = (fullWidth - Number.parseInt(width, 10)) / 2 / zoom + otherScreenLeft;
  const top = (fullHeight - Number.parseInt(height, 10)) / 2 / zoom + otherScreenTop;

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

export function open(url, windowFeatures) {
  return new Promise((resolve, reject) => {
    const {
      origin,
      pathname,
      search,
      hash,
    } = new URL(url, /^https?:\/\//.test(url) ? undefined : window.location.origin);

    const pid = uid();
    const urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${hash}`;

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

  if (!pid) {
    throw new Error('Invalid call, there is no pid in search parameters.');
  }

  window.opener.postMessage({
    pid, result, payload,
  });

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
