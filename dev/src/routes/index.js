function createRoutesByGlobImport(modules, match) {
  return Object.keys(modules).map((key) => {
    const matched = match(key);

    if (!matched) {
      throw new Error(`Invalid path, could not parse "${key}"`);
    }

    const [, rootDir, subDirs] = matched;
    const name = matched.pop();

    return {
      path: `${rootDir}${subDirs}/${name}`,
      meta: { name, isGlobImport: true },
      component: modules[key],
    };
  });
}

export default [
  {
    path: '/',
    component: () => import('@/pages/IndexPage.vue'),
  },

  // publish
  ...createRoutesByGlobImport(
    import.meta.glob('@/pages/publish/**/*.vue'),
    (key) => key.match(/(\/publish)((\/\w+)*)\/(\w+)\.vue$/),
  ),

  // templates
  ...createRoutesByGlobImport(
    import.meta.glob('@/pages/templates/**/*.vue'),
    (key) => key.match(/(\/templates)((\/\w+)*)\/(\w+)\.vue$/),
  ),

  // tests
  ...createRoutesByGlobImport(
    import.meta.glob('@/pages/tests/**/*.vue'),
    (key) => key.match(/(\/tests)((\/\w+)*)\/(\w+)\.vue$/),
  ),
];
