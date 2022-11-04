import { camelCase, toUpper } from 'lodash-es';

const pascalCase = (s) => camelCase(s).replace(/^(.)/, toUpper);

function createRoutesByGlobImport(modules, match) {
  return Object.keys(modules).map((key) => {
    const matched = match(key);

    if (!matched) {
      throw new Error(`Invalid path, could not parse "${key}"`);
    }

    const [, rootDir, subDirs] = matched;
    const label = matched.pop();

    const name = [
      ...rootDir.split('/').map(pascalCase),
      ...subDirs.split('/').splice(1).map(pascalCase),
      pascalCase(label),
    ].join('/');

    return {
      name,
      path: name,
      meta: { label, isGlobImport: true },
      component: modules[key],
    };
  });
}

export default [
  {
    path: '/',
    component: () => import('~dev/routes/IndexPage.vue'),
  },

  // publish
  ...createRoutesByGlobImport(
    import.meta.glob('~dev/pages/publish/**/*.vue'),
    (key) => key.match(/(\/publish)((\/\w+)*)\/(\w+)\.vue$/),
  ),

  // templates
  ...createRoutesByGlobImport(
    import.meta.glob('~dev/pages/templates/**/*.vue'),
    (key) => key.match(/(\/templates)((\/\w+)*)\/(\w+)\.vue$/),
  ),

  // tests
  ...createRoutesByGlobImport(
    import.meta.glob('~dev/pages/tests/**/*.vue'),
    (key) => key.match(/(\/tests)((\/\w+)*)\/(\w+)\.vue$/),
  ),
];
