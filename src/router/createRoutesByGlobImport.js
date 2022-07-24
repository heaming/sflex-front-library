import { kebabCase } from 'lodash-es';

export default (modules) => {
  const keys = Object.keys(modules);
  return keys.map((key) => {
    const [,, name] = key.match(/\/pages(\/\w+)+\/(\w+M)\.vue$/) || [];

    if (!name) {
      throw new Error(
        `Invalid glob import, could not found page name. (imported file: ${key})`,
      );
    }

    return {
      name,
      path: `/${kebabCase(name.substring(0, name.length - 1))}`,
      component: modules[key],
      meta: { isGlobImport: true },
    };
  });
};
