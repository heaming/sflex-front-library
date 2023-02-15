import { find, filter, kebabCase } from 'lodash-es';
import store from '../store';

function recursiveBuildPath(app, menu) {
  const paths = [];

  const { folderYn, pageDestinationValue } = menu;
  const menuIsPage = folderYn === 'N' && !!pageDestinationValue;

  if (menuIsPage) {
    const name = pageDestinationValue;

    paths.push(
      kebabCase(name.substring(0, name.length - 1)),
    );

    const { pageTypeCode, pageId, linkPageId } = menu;

    if (pageTypeCode === 'L') {
      const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);
      const linkParams = (linkPage?.pageParameter || []);

      paths.push(
        ...linkParams.map((e) => kebabCase(e.pageParameterValue)),
      );
    }
  }

  const menuUid = menu.parentsMenuUid;
  const menuLevel = menu.menuLevel - 1;
  const matched = find(store.getters['meta/getMenus'], { menuUid, menuLevel });

  if (matched !== undefined) {
    paths.unshift(
      ...recursiveBuildPath(app, matched),
    );
  } else {
    paths.unshift('', app.applicationUrl.toLowerCase());
  }

  return paths;
}

function addRoutesByMenu(router, route, app, menu) {
  router.addRoute({
    ...route,
    name: menu.menuUid ? menu.menuUid : menu.pageId,
    path: recursiveBuildPath(app, menu).join('/'),
    meta: {
      requiresAuth: true,
      applicationId: app.applicationId,
      applicationName: app.applicationName,
      menuUid: menu.menuUid ? menu.menuUid : menu.pageId,
      menuName: menu.menuName ? menu.menuName : menu.pageId,
      parentsMenuUid: menu.parentsMenuUid,
      pageId: menu.pageId,
      pageUseCode: menu.pageUseCode,
      pageName: menu.pageDestinationValue,
    },
  });
}

function addRoutesByApp(router, route, app) {
  const menus = store.getters['meta/getMenus'];
  const { applicationId } = app;
  const pageDestinationValue = route.name;
  const targets = filter(menus, { applicationId, pageDestinationValue });

  targets.forEach((menu) => {
    addRoutesByMenu(router, route, app, menu);
  });
}

export function rebuildRoutes(router) {
  const routes = router.getRoutes();
  const globImportedRoutes = filter(routes, (route) => route.meta.glob === true);
  const apps = store.getters['meta/getApps'];
  const extAccPages = store.getters['meta/getExtAccPages'];
  globImportedRoutes.forEach((route) => {
    const extPage = filter(extAccPages, (p) => p.pageDestinationValue === route.name);
    if (extPage.length > 0) {
      const pageInfo = extPage[0];
      router.addRoute({
        ...route,
        name: pageInfo.pageName ? pageInfo.pageName : pageInfo.pageId,
        path: `/${kebabCase(pageInfo.pageDestinationValue.substring(0, pageInfo.pageDestinationValue.length - 1))}`,
        meta: {
          requiresAuth: false,
          applicationId: null,
          applicationName: null,
          menuUid: pageInfo.pageId,
          menuName: pageInfo.pageDestinationValue,
          parentsMenuUid: null,
          pageId: pageInfo.pageId,
          pageUseCode: 'S',
          pageName: pageInfo.pageDestinationValue,
        },
      });
    }
    apps.forEach((app) => {
      addRoutesByApp(router, route, app);
    });
  });

  globImportedRoutes.forEach((route) => {
    router.removeRoute(route.name);
  });
}
