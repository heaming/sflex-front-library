import { uniqueId, debounce } from 'lodash-es';
import { updateGlobalVm } from './globalVm';
import { GlobalModalVmKey } from '../../consts/private/symbols';
import store from '../../store';
import { platform } from '../../plugins/platform';

const globalData = [];

const normalizeData = (data) => ({
  ...data,
  vmKey: data.vmKey,
});

export function getGlobalData(vmKey) {
  return globalData.filter((v) => !vmKey || v.vmKey === vmKey);
}

export function removeGlobalData(e) {
  const index = typeof e === 'object'
    ? globalData.indexOf(e)
    : globalData.findIndex((v) => v.uid === e);

  const data = globalData[index];
  const { vmKey } = data;

  globalData.splice(index, 1);
  updateGlobalVm(vmKey);

  const modals = getGlobalData(GlobalModalVmKey);
  if (modals.length <= 0) {
    /* eslint-disable-next-line no-use-before-define */
    window.removeEventListener('popstate', closeModal);
  }
}

const removeModalWhenHistoryBack = debounce((modals) => {
  if (modals.length > 0) removeGlobalData(modals[modals.length - 1].uid);
}, 100);

const closeModal = () => {
  const modals = getGlobalData(GlobalModalVmKey);
  if (modals.length > 0) {
    store.dispatch('meta/fetchLocatedFromHistory', true);
    removeModalWhenHistoryBack(modals);
  }
};

export function addGlobalData(data) {
  data = normalizeData(data);

  const { vmKey } = data;
  data.uid = uniqueId(vmKey);

  globalData.push(data);
  updateGlobalVm(vmKey, data);

  if (!platform.is.desktop) {
    window.removeEventListener('popstate', closeModal);
    window.addEventListener('popstate', closeModal);
  }
}
