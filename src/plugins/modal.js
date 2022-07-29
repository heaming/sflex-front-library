import { GlobalModalVmKey } from '../consts/private/symbols';
import { addGlobalDatas } from '../utils/private/globalDatas';
import { defineGetters } from '../utils/private/globalProperty';
import store from '../store';

const popups = {};

export function registerPopupsByGlobImport(modules) {
  Object.keys(modules).forEach((key) => {
    // becare when fix this line
    const matched = key.match(/\/pages((\/\w+)*)\/(\w+P)\.vue$/);

    if (!matched) {
      throw new Error(`Invalid path, could not parse "${key}"`);
    }

    const name = matched.pop();

    popups[name] = {
      name,
      component: modules[key],
    };
  });
}

const normalizeOptions = (options) => ({
  component: options.component,
  componentProps: options.componentProps || {},
  componentResolved: false,
  draggable: options.draggable === true,
  ignoreOnModified: options.ignoreOnModified === true,
  beforeClose: options.beforeClose || (() => true),
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
    addGlobalDatas({
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
