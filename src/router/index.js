import { createRouter, createWebHashHistory } from 'vue-router';
import { unionBy, find } from 'lodash-es';
import beforeEach, { INITIAL_LOCATION } from './hooks/beforeEach';
import beforeResolve from './hooks/beforeResolve';
import afterEach from './hooks/afterEach';
import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';
import store from '../store';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
  history: createWebHashHistory(env.BASE_URL),
});

export default router;

function registerRoutes(routes) {
  const mergedRoutes = unionBy([
    ...routes,

    // default routes
    // this routes replaced by same named route
    {
      name: 'ErrorNotFound',
      path: '/:catchAll(.*)*',
      component: () => import('../pages/ErrorNotFound.vue'),
    },
  ], 'name');

  mergedRoutes.forEach(router.addRoute);
}

function registerHooks() {
  if (env.TEST === false) {
    router.beforeEach(beforeEach);
    router.beforeResolve(beforeResolve);
    router.afterEach(afterEach);
  }
}

export function installRouter(app, routes) {
  defineGetters(app, { router });
  registerRoutes(routes);
  registerHooks(router);
  app.use(router);
}

function replaceGlobRoutes() {
  const apps = store.getters['meta/getApps'];
  const menus = store.getters['meta/getMenus'];

  const routes = router.getRoutes()
    .filter(({ meta }) => meta.glob === true);

  routes.forEach((route) => {
    apps.forEach(({ applicationId, applicationUrl }) => {
      const pageDestinationValue = route.name;
      const matched = find(menus, { applicationId, pageDestinationValue });

      if (matched) {
        const { menuUid, menuName, pageId, pageUseCode } = matched;

        router.addRoute({
          ...route,
          name: menuUid,
          path: `/${applicationUrl.toLowerCase()}${route.path}`,
          meta: {
            requiresAuth: true,
            applicationId,
            menuUid,
            menuName,
            pageId,
            pageUseCode,
          },
        });
      }
    });
  });

  routes.forEach((route) => {
    router.removeRoute(route.name);
  });
}

export async function isReady() {
  replaceGlobRoutes();
  await router.isReady();
  await router.replace(INITIAL_LOCATION);
}
