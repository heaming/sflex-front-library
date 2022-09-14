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

function assignParamsByQuery(to) {
  Object.assign(to.params, { ...to.query });
}

function assignParamsIfIsLinkPage(to) {
  const {
    pageId,
    pageTypeCode,
    linkPageId,
  } = store.getters['meta/getMenu'](to.name) || {};

  if (pageId && pageTypeCode === 'L') {
    const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);

    Object.assign(to.params, {
      ...linkPage?.pageParameter
        .reduce((a, v) => { a[v.pageParameterName] = v.pageParameterValue; return a; }, {}),
    });
  }
}

async function beforeResolve(to) {
  await throwIfNotAuthorized(to);
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
}

function setSelectedGnbLnb(to) {
  if (to.meta?.requiresAuth) {
    const { applicationId, menuUid } = store.getters['meta/getMenu'](to.name);
    store.commit('app/setSelectedGnbKey', applicationId);
    store.commit('app/setSelectedLnbKey', menuUid);
  }
}

function afterEach(to) {
  setSelectedGnbLnb(to);
}

export function registerHooks(router) {
  if (!__VUE_TEST_APP__) {
    router.beforeEach(beforeEach);
    router.beforeResolve(beforeResolve);
    router.afterEach(afterEach);
  }
}
