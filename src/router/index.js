import { createRouter, createWebHashHistory } from 'vue-router';
import { unionBy } from 'lodash-es';
import beforeEach, { INITIAL_LOCATION } from './hooks/beforeEach';
import beforeResolve from './hooks/beforeResolve';
import afterEach from './hooks/afterEach';
import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
  history: createWebHashHistory(env.BASE_URL),
});

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
  if (!__VUE_TEST_APP__) {
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

export { INITIAL_LOCATION };

export default router;
