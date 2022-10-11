import { find } from 'lodash-es';
import router from '../../router';

function removeGlobImportedRoutes() {
  router.getRoutes().forEach((route) => {
    if (route.meta.isGlobImport) {
      router.removeRoute(route.name);
    }
  });
}

export function replaceRoutesByMenus(apps, menus) {
  router.getRoutes().forEach((route) => {
    if (route.meta.isGlobImport) {
      apps.forEach(({ applicationId, applicationUrl }) => {
        const pageDestinationValue = route.name;
        const matched = find(menus, { applicationId, pageDestinationValue });

        if (matched) {
          const { menuUid, menuName } = matched;

          router.addRoute({
            ...route,
            name: menuUid,
            path: `/${applicationUrl.toLowerCase()}${route.path}`,
            meta: {
              requiresAuth: true,
              applicationId,
              menuUid,
              menuName,
            },
          });
        }
      });
    }
  });

  removeGlobImportedRoutes();
}
