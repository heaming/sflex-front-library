import { GlobalModalVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';
import store from '../store';

export const popups = {};

const normalizeOptions = (options) => ({
  component: options.component,
  componentProps: options.componentProps || {},
  componentResolved: false,
  draggable: options.draggable === true,
});

export async function modal(options) {
  options = normalizeOptions(options);

  if (typeof options.component === 'function') {
    options.component = defineAsyncComponent(options.component);
  } else {
    const name = options.component;

    if (!popups[name]) {
      throw new Error(`No match for ${name}`);
    }

    await store.dispatch('meta/fetchPage', name);
    options.component = defineAsyncComponent(popups[name].component);
  }

  return new Promise((resolve) => {
    addGlobalData({
      ...normalizeOptions(options),
      vmKey: GlobalModalVmKey,
      resolve,
    });
  });
}

export default {
  install(app) {
    defineGetters(app, { modal });
  },
};
