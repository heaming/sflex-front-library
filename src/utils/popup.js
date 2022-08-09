import { openURL, uid } from 'quasar';

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

function registerOpened(pid, resolve) {
  if (!globalMessageEvent) {
    registerMessageEvent();
  }

  openedPopups[pid] = resolve;
}

const normalizeOptions = (options = {}) => ({
  width: options.width,
  height: options.height,
  popup: options.popup !== false,
  noopener: options.noopener === true,
  noreferrer: options.noreferrer === true,
  menubar: options.menubar === true,
  toolbar: options.toolbar === true,
});

export function open(url, options, useReturnPromise = true) {
  options = normalizeOptions(options);

  const {
    origin,
    pathname,
    hash,
    search,
  } = new URL(url, /^https?:\/\//.test(url) ? undefined : window.location.origin);

  const pid = uid();
  const urlWithUid = `${origin}${pathname}${search}${search ? '&' : '?'}pid=${pid}${hash}`;

  const openedWindow = openURL(urlWithUid, null, options);

  if (useReturnPromise && openedWindow) {
    return new Promise((resolve) => { registerOpened(pid, resolve); });
  }
}

function close(result, payload, forceClose = true) {
  const pid = new URLSearchParams(window.location.search).get('pid');

  if (!pid) {
    throw new Error('invalid call, there is no pid in search params.');
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
