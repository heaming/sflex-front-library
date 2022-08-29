/* eslint-disable prefer-rest-params */
import { GlobalDialogVmKey } from '../consts/private/symbols';
import { addGlobalDatas } from '../utils/private/globalDatas';
import { defineGetters } from '../utils/private/globalProperty';

const normalizeOptions = (options = {}) => ({
  icon: options.icon,
  subMessage: options.subMessage,
  refocus: options.refocus !== false,
});

export function alert(message, options = {}) {
  return new Promise((resolve) => {
    addGlobalDatas({
      ...normalizeOptions(options),
      message,
      isConfirm: false,
      vmKey: GlobalDialogVmKey,
      resolve,
    });
  });
}

export function confirm(message, options) {
  return new Promise((resolve) => {
    addGlobalDatas({
      ...normalizeOptions(options),
      message,
      isConfirm: true,
      vmKey: GlobalDialogVmKey,
      resolve,
    });
  });
}

export default {
  install(app) {
    defineGetters(app, { alert, confirm });
  },
};
