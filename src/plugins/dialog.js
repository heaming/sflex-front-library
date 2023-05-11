import { GlobalDialogVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';

const normalizeOptions = (options = {}) => ({
  icon: options.icon,
  subMessage: options.subMessage,
  refocus: options.refocus !== false,
  customBtns: options.customBtns,
});

export function alert(message, options = {}) {
  return new Promise((resolve) => {
    addGlobalData({
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
    addGlobalData({
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
