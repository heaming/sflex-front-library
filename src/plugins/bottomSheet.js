import { GlobalBottomSheetVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';

const normalizeOptions = (options = {}) => ({
  title: options.title,
  items: options.items,
  refocus: options.refocus !== false,
});

export function bottomSheet(options) {
  return new Promise((resolve) => {
    addGlobalData({
      ...normalizeOptions(options),
      vmKey: GlobalBottomSheetVmKey,
      resolve,
    });
  });
}

export default {
  install(app) {
    defineGetters(app, { bottomSheet });
  },
};
