/* eslint-disable prefer-rest-params */
import { GlobalDialogVmKey } from '../consts/private/symbols';
import { addGlobalDatas } from '../utils/private/globalDatas';
import { defineGetters } from '../utils/private/globalProperty';

const DIALOG_TYPE = {
  ALERT: 'Alert',
  CONFIRM: 'Confirm',
};

const normalizeOptions = (type, options = {}) => ({
  title: options.title || type,
  refocus: options.refocus !== false,
});

export function alert(message, options = {}) {
  return new Promise((resolve) => {
    addGlobalDatas({
      ...normalizeOptions(DIALOG_TYPE.ALERT, options),
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
      ...normalizeOptions(DIALOG_TYPE.CONFIRM, options),
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
