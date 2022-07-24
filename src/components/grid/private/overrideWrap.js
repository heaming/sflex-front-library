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
