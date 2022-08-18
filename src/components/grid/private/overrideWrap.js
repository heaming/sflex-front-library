function wrap(obj, key, fn, isEvent = false) {
  obj.__originalFns__ ||= {};
  obj.__originalFns__[key] = obj[key];

  const chains = key.split('.');
  const targetKey = chains.pop();
  const target = chains.reduce((o, k) => o[k], obj);

  Object.defineProperty(target, targetKey, {
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
  wrap(obj, key, fn, false);
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
