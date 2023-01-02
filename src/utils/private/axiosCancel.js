import { uniqueId } from 'lodash-es';

const cancelEvents = {};

export function resolveCancel(uid) {
  const cancelEvent = cancelEvents[uid];

  if (cancelEvent) {
    window.removeEventListener('keydown', cancelEvent);
  }
}

export function createCancel() {
  const controller = new AbortController();
  const uid = uniqueId('__axiosCancel__');

  function cancelEvent(e) {
    // console.log(e);

    if (e.key === 'Escape' || e.keyCode === 27) {
      controller.abort();
      resolveCancel(uid);
    }
  }

  window.addEventListener('keydown', cancelEvent);

  return {
    uid,
    signal: controller.signal,
  };
}
