import { createRouter, createWebHashHistory } from 'vue-router';
import defaultRoutes from './defaultRoutes';
import { INITIAL_LOCATION, registerHooks } from './hooks';
import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';
import createRoutesByGlobImport from './createRoutesByGlobImport';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
  history: createWebHashHistory(env.BASE_URL),
});

function registerRoutes(routes) {
  const routeNames = routes.map((v) => v.name);
  const mergedRoutes = [
    ...routes,
    ...defaultRoutes.filter((v) => !routeNames.includes(v.name)),
  ];

  mergedRoutes.forEach(router.addRoute);
}

export function installRouter(app, routes) {
  defineGetters(app, { router });

  registerRoutes(routes);
  registerHooks(router);

  app.use(router);
}

export { INITIAL_LOCATION };

export { createRoutesByGlobImport };

export default router;
