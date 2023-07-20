import { Platform, openURL, uid } from 'quasar';
import { isEmpty } from 'lodash-es';
import store from '../store';
import pascalCase from './private/pascalCase';

const path = window.location.hash.split('?')[0];
const name = `${pascalCase(path)}P`;
const openedPopups = {};
const openedPopupKeys = {};

let globalMessageEvent;
let globalCloseEvent;

function registerMessageEvent() {
  globalMessageEvent = (e) => {
    const { pid, result, payload, shouldPostMessage } = e.data;

    // windowKey부터 있으면 삭제
    if (pid && openedPopupKeys[pid]) {
      // 삭제로직 추가.
      // eslint-disable-next-line no-eval
      eval(`delete window.${openedPopupKeys[pid]}`);
      delete openedPopupKeys[pid];
    }
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

function registerOpenedPopup(pid, resolve, windowKey = null) {
  if (!globalMessageEvent) {
    registerMessageEvent();
  }

  openedPopups[pid] = resolve;
  if (windowKey) {
    openedPopupKeys[pid] = windowKey;
  }
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

export function registerWindowKeyEvent() {
  window.opener.updateChildWindowReference(window);
}

export function registerCloseEvent() {
  globalCloseEvent = () => {
    close(false, undefined, false);
  };

  window.addEventListener('beforeunload', globalCloseEvent, false);
}

export async function open(url, windowFeatures, params = null, windowKey = null) {
  return new Promise((resolve, reject) => {
    // 부모창으로 세팅
    window.name = 'ky_parent';
    const {
      origin,
      pathname,
      search,
      hash,
    } = new URL(url, /^https?:\/\//.test(url) ? undefined : window.location.origin);

    const pid = uid();
    let urlWithUid;
    let paramUrl = '';
    let needRegist = true;
    if (params && typeof params === 'object') {
      Object.keys(params).forEach((key) => {
        paramUrl += `&${key}=${params[key]}`;
      });
      urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${paramUrl.trim().length > 0 ? paramUrl : ''}${hash}`;
    } else urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${hash}`;
    if (windowKey) {
      /* eslint-disable no-eval */
      window.updateChildWindowReference = function (childWindow) {
        console.log(childWindow);
        eval(`window.${windowKey} = childWindow`);
      };
      if (eval(`window.${windowKey}`)) {
        // url 이 같은지를 확인
        if (eval(`window.${windowKey}_url`) === (origin + paramUrl)) {
          eval(`window.${windowKey}.focus();`);
          needRegist = false;
        } else {
          // 떠있던 화면의 pid를 가져와서 popups[pid] 로 검색해서 팝업을 삭제해 줌.
          const childPid = eval(`new URLSearchParams(window.${windowKey}.location.search).get('pid')`);
          if (childPid && openedPopups[childPid]) {
            delete openedPopups[childPid];
          }

          eval(`window.${windowKey}_url = origin + paramUrl`);
          eval(`window.${windowKey}.location.href = urlWithUid`);
          eval(`window.${windowKey}.focus();`);
        }
      } else {
        eval(`window.${windowKey}_url = origin + paramUrl`);
        eval(`window.${windowKey}= openURL(urlWithUid, () => {
          reject(
            new Error('pop-up open failed, check whether your browser blocks pop-ups.'),
          );
        }, parseFeatures(windowFeatures));`);
      }
      /* eslint-enable */
    } else {
      openURL(urlWithUid, () => {
        reject(
          new Error('pop-up open failed, check whether your browser blocks pop-ups.'),
        );
      }, parseFeatures(windowFeatures));
    }
    if (needRegist) {
      registerOpenedPopup(pid, resolve, windowKey);
    }
  });
}

export function ok(payload) {
  close(true, payload);
}

export function cancel(payload) {
  close(false, payload);
}
