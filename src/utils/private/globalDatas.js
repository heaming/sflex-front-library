import { uniqueId } from 'lodash-es';
import { updateGlobalVm } from './globalVms';

const globalDatas = [];

const normalizeOptions = (options) => ({
  ...options,
  vmKey: options.vmKey,
});

export function addGlobalDatas(options) {
  options = normalizeOptions(options);

  const { vmKey } = options;
  options.uid = uniqueId(vmKey);

  globalDatas.push(options);
  updateGlobalVm(vmKey);
}

export function removeGlobalDatas(e) {
  const index = typeof e === 'object'
    ? globalDatas.indexOf(e)
    : globalDatas.findIndex((v) => v.uid === e);

  const { vmKey } = globalDatas[index];

  globalDatas.splice(index, 1);
  updateGlobalVm(vmKey);
}

export function getGlobalDatas(vmKey) {
  return globalDatas.filter((v) => !vmKey || v.vmKey === vmKey);
}
