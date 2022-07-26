import { kebabCase } from 'lodash-es';

export default (modules) => {
  const keys = Object.keys(modules);
  return keys.map((key) => {
    const [,, name] = key.match(/\/pages((\/\w+)*)\/(\w+)M\.vue$/) || [];

    if (!name) {
      throw new Error(`Invalid path, could not parse "${key}"`);
    }

    return {
      name,
      path: `/${kebabCase(name.substring(0, name.length - 1))}`,
      component: modules[key],
      props: true,
      meta: { isGlobImport: true },
    };
  });
};
