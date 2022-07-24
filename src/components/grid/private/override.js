import { GridBase } from 'realgrid';
import * as dataEvents from './overrideDataEvents';
import * as dataMethods from './overrideDataMethods';
import * as viewEvents from './overrideViewEvents';
import * as viewMethods from './overrideViewMethods';

const dataOverrides = Object.values({ ...dataEvents, ...dataMethods });
const viewOverrides = Object.values({ ...viewEvents, ...viewMethods });

function wrap(obj, key, fn, isEvent = false) {
  obj.__originalFns__ ||= {};
  obj.__originalFns__[key] = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return fn;
    },
    set(value) {
      if (isEvent) {
        obj.__originalFns__[key] = value;
      }
    },
  });
}

export function wrapMethod(obj, key, fn) {
  wrap(obj, key, fn);
}

export function wrapEvent(obj, key, fn) {
  wrap(obj, key, fn, true);
}

export function hasOriginal(obj, key) {
  return typeof obj.__originalFns__[key] === 'function';
}

export function execOriginal(obj, key, ...args) {
  return obj.__originalFns__[key].call(obj, ...args);
}

export default (obj, vm) => {
  const overrides = obj instanceof GridBase
    ? viewOverrides : dataOverrides;

  overrides.forEach((fn) => {
    fn(obj, vm);
  });
};
