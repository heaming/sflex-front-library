import { isEmpty, pick } from 'lodash-es';
import store from '../store';

export const INITIAL_LOCATION = {};

function beforeEach(to, from, next) {
  if (isEmpty(INITIAL_LOCATION)) {
    Object.assign(
      INITIAL_LOCATION,
      pick(to, ['path', 'query']),
    );

    next('/');
    return;
  }

  next();
}

async function throwIfNotAuthorized(to) {
  if (to.meta?.requiresAuth) {
    const { pageId } = store.getters['meta/getMenu'](to.name);
    await store.dispatch('meta/fetchPage', pageId);
  }
}

async function beforeResolve(to) {
  await throwIfNotAuthorized(to);
}

export function registerHooks(router) {
  if (!__VUE_TEST_APP__) {
    router.beforeEach(beforeEach);
    router.beforeResolve(beforeResolve);
  }
}
