import router from './index';

function removeGlobImportedRoutes() {
  router.getRoutes().forEach((route) => {
    if (route.meta.isGlobImport) {
      router.removeRoute(route.name);
    }
  });
}

export default (menus) => {
  router.getRoutes().forEach((route) => {
    const matched = menus.find((v) => v.pageDestinationValue === route.name);

    if (matched) {
      router.addRoute({
        ...route,
        name: matched.menuUid,
        path: `/${matched.applicationId.toLowerCase()}${route.path}`,
        meta: { requiresAuth: true },
      });
    }
  });

  removeGlobImportedRoutes();
};
