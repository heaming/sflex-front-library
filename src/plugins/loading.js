import { GlobalLoadingVmKey } from '../consts/private/symbols';
import { getGlobalVm } from '../utils/private/globalVms';
import { defineGetters } from '../utils/private/globalProperty';

export function loadSpinner(value = true) {
  const { proxy } = getGlobalVm(GlobalLoadingVmKey);

  if (value === true) {
    proxy.increaseLoadCount();
  } else {
    proxy.decreaseLoadCount();
  }
}

export function loadProgress(value = 0) {
  const { proxy } = getGlobalVm(GlobalLoadingVmKey);
  proxy.setProgressValue(value);
}

export default {
  install(app) {
    defineGetters(app, { loadSpinner, loadProgress });
  },
};
