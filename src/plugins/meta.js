import store from '../store';
import { defineGetters } from '../utils/private/globalProperty';

export function getConfig(configId, fallbackValue) {
  return store.getters['meta/getConfig'](configId)?.configurationValue ?? fallbackValue;
}

export default {
  install(app) {
    defineGetters(app, { getConfig });
  },
};
