import { GlobalNotifyVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';

const normalizeOptions = (options = {}) => ({
  icon: options.icon,
});

export function notify(message, options = {}) {
  addGlobalData({
    ...normalizeOptions(options),
    message,
    vmKey: GlobalNotifyVmKey,
  });
}

export default {
  install(app) {
    defineGetters(app, { notify });
  },
};
