import { createRouter, createWebHashHistory } from 'vue-router';
import { unionBy } from 'lodash-es';
import beforeEach, { INITIAL_LOCATION } from './hooks/beforeEach';
import beforeResolve from './hooks/beforeResolve';
import afterEach from './hooks/afterEach';
import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';
import { rebuildRoutes } from './helper';
import { alert } from '../plugins/dialog';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
  history: createWebHashHistory(env.BASE_URL),
});

router.onError(async (error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')
  || error.message.includes('Importing a module script failed')) {
    await alert('routing 에러가 났습니다. 브라우저 새로고침 해주세요.');
    console.log(`router.onError ::: ${to.fullPath}`, to);
  }
});

export default router;

function addRoutes(routes) {
  const mergedRoutes = unionBy([
    ...routes,

    // default routes
    // this routes replace by same named route
    {
      name: 'ErrorNotFound',
      path: '/:catchAll(.*)*',
      component: () => import('../pages/ErrorNotFound.vue'),
    },
  ], 'name');

  mergedRoutes.forEach((e) => {
    router.addRoute(e);
  });
}

function addHooks() {
  if (env.TEST === false) {
    router.beforeEach(beforeEach);
    router.beforeResolve(beforeResolve);
    router.afterEach(afterEach);
  }
}

export function installRouter(app, { routes }) {
  defineGetters(app, { router });
  addRoutes(routes);
  addHooks(router);
  app.use(router);
}

export async function isReady() {
  rebuildRoutes(router);
  try {
    await router.isReady();
    await router.replace(INITIAL_LOCATION);
  } catch (e) {
    // ignore
  }
}
