import { kebabCase } from 'lodash-es';

export default (modules) => {
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
      meta: { isGlobImport: true },
    };
  });
};
