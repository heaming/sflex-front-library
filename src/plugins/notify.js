import { GlobalNotifyVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';

export function notify(message) {
  addGlobalData({
    message,
    vmKey: GlobalNotifyVmKey,
  });
}

export default {
  install(app) {
    defineGetters(app, { notify });
  },
};
