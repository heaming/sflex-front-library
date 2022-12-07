import { kebabCase } from 'lodash-es';
import { popups } from './plugins/modal';

export function createRoutesByGlobImport(modules) {
  const keys = Object.keys(modules);
  return keys.map((key) => {
    // becare when fix this line
    const matched = key.match(/\/pages((\/\w+)*)\/(\w+M)\.vue$/);

    if (!matched) {
      throw new Error(`Invalid path, could not parse "${key}"`);
    }

    const name = matched.pop();

    return {
      name,
      path: `/${kebabCase(name.substring(0, name.length - 1))}`,
      component: modules[key],
      props: true,
      meta: { glob: true },
    };
  });
}

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
