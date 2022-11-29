const globalVms = {};

export function registerGlobalVm(vmKey, vm, update) {
  globalVms[vmKey] = { vm, update };
}

export function unregisterGlobalVm(vmKey) {
  delete globalVms[vmKey];
  globalVms[vmKey] = null;
}

export function getGlobalVm(vmKey) {
  return globalVms[vmKey].vm;
}

export function updateGlobalVm(vmKey, data) {
  globalVms[vmKey]?.update(data);
}
