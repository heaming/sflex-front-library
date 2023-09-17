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
  const { pageTypeCode, pageId, linkPageId } = menu;
  let linkParams = [];
  if (pageTypeCode === 'L') {
    const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);
    linkParams = (linkPage?.pageParameter || []);
  }
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
      portalId: app.portalId,
      linkPageParam: linkParams.length > 0 ? linkParams[0].pageParameterValue : '',
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
  const noMenuPages = store.getters['meta/getNoMenuPages'];
  globImportedRoutes.forEach((route) => {
    const noMenuPage = filter(noMenuPages, (p) => p.pageDestinationValue === route.name);
    if (noMenuPage.length > 0) {
      const pageInfo = noMenuPage[0];
      router.addRoute({
        ...route,
        name: pageInfo.pageId,
        path: `/${kebabCase(pageInfo.pageDestinationValue.substring(0, pageInfo.pageDestinationValue.length - 1))}`,
        meta: {
          requiresAuth: true,
          applicationId: null,
          applicationName: null,
          menuUid: pageInfo.pageId,
          menuName: pageInfo.pageName,
          parentsMenuUid: null,
          pageId: pageInfo.pageId,
          pageUseCode: pageInfo.pageUseCode,
          pageName: pageInfo.pageDestinationValue,
          noMenuPage: true,
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
