// eslint-disable-next-line no-unused-vars
export function getComponentType(componentName) {
  return null;
}

export function defineGrid(initFn) {
  return initFn;
}

export function defineTreeGrid(initFn) {
  return initFn;
}

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
