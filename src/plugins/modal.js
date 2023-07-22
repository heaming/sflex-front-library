import { kebabCase } from 'lodash-es';
import { GlobalModalVmKey } from '../consts/private/symbols';
import { addGlobalData } from '../utils/private/globalData';
import { defineGetters } from '../utils/private/globalProperty';
import env from '../consts/private/env';
import { open } from '../utils/popup';
import store from '../store';

export const popups = {};

const normalizeOptions = (options) => ({
  component: options.component,
  componentProps: options.componentProps || {},
  componentResolved: false,
  dialogProps: options.dialogProps || {},
  window: options.window === true,
  redirect: options.redirect === true,
  windowFeatures: options.windowFeatures,
});

function openWindow(options) {
  const name = options.component;

  if (!popups[name]) {
    throw new Error(`No match for ${name}`);
  }

  const search = options.redirect ? '?redirect' : '';
  const kebabCased = kebabCase(name.substring(0, name.length - 1));
  const routeQuery = new URLSearchParams(options.componentProps);
  const url = `${env.VITE_ENTRY_POPUP_PATHNAME}#${search}/${kebabCased}?${routeQuery}`;

  return open(url, options.windowFeatures);
}

async function openModal(options) {
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

export async function modal(options) {
  options = normalizeOptions(options);

  if (options.window) {
    return openWindow(options);
  }

  return openModal(options);
}

export default {
  install(app) {
    defineGetters(app, { modal });
  },
};
