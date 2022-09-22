import { popups } from './plugins/modal';

export default (modules) => {
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
};
