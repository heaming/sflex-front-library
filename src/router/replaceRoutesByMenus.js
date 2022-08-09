import { find } from 'lodash-es';
import router from './index';

function removeGlobImportedRoutes() {
  router.getRoutes().forEach((route) => {
    if (route.meta.isGlobImport) {
      router.removeRoute(route.name);
    }
  });
}

export default (apps, menus) => {
  router.getRoutes().forEach((route) => {
    if (route.meta.isGlobImport) {
      apps.forEach((x) => {
        const matched = find(menus, [
          'applicationId', x.applicationId,
          'pageDestinationValue', route.name,
        ]);

        if (matched) {
          router.addRoute({
            ...route,
            name: matched.menuUid,
            path: `/${matched.applicationId.toLowerCase()}${route.path}`,
            meta: { requiresAuth: true },
          });
        }
      });
    }
  });

  removeGlobImportedRoutes();
};
