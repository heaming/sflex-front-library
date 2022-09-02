import { uniqueId } from 'lodash-es';
import { updateGlobalVm, UPDATE_STATE } from './globalVm';

const globalData = [];

const normalizeData = (data) => ({
  ...data,
  vmKey: data.vmKey,
});

export function addGlobalData(data) {
  data = normalizeData(data);

  const { vmKey } = data;
  data.uid = uniqueId(vmKey);

  globalData.push(data);
  updateGlobalVm(vmKey, UPDATE_STATE.ADDED, data);
}

export function removeGlobalData(e) {
  const index = typeof e === 'object'
    ? globalData.indexOf(e)
    : globalData.findIndex((v) => v.uid === e);

  const data = globalData[index];
  const { vmKey } = data;

  globalData.splice(index, 1);
  updateGlobalVm(vmKey, UPDATE_STATE.REMOVED, data);
}

export function getGlobalData(vmKey) {
  return globalData.filter((v) => !vmKey || v.vmKey === vmKey);
}
