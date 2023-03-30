import { map } from 'lodash-es';
import store from '../../store';
import { http } from '../../plugins/http';

function assignParamsByQuery(to) {
  Object.assign(to.params, {
    ...to.query,
  });
}

function assignParamsIfIsLinkPage(to) {
  const { menuUid } = to.meta;
  const matched = store.getters['meta/getMenu'](menuUid);

  if (matched) {
    const { pageId, pageTypeCode, linkPageId } = matched;
    const isLinkPage = pageId && pageTypeCode === 'L';

    if (isLinkPage) {
      const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);

      Object.assign(to.params, {
        ...linkPage?.pageParameter
          .reduce((a, v) => { a[v.pageParameterName] = v.pageParameterValue; return a; }, {}),
      });
    }
  }
}

async function loggingIfNeeded(to) {
  const { meta } = to;
  const shouldLogging = meta.logging === true && meta.pageUseCode === 'N';

  if (shouldLogging) {
    const logData = {
      menuLogTypeCode: 'MENU',
      menuLogObjectId: meta.menuUid,
      menuName: meta.menuName,
      appId: meta.applicationId,
      pageId: meta.pageId,
    };

    try {
      await http.post('/sflex/common/common/portal/menus/logging', logData, { silent: true });
      await store.dispatch('meta/fetchRecentMenus');
    } catch (e) {
      // ignore
    }
  }
}

function setSelectedGlobalKeys(to) {
  const appKey = to.meta.applicationId || null;
  let menuKey = to.meta.menuUid || null;

  // sub page
  if (to.meta.pageUseCode === 'S') {
    const menuPaths = store.getters['meta/getMenuPaths'](menuKey);
    const parentsMenuUids = map(menuPaths, 'key');
    menuKey = parentsMenuUids[parentsMenuUids.length - 2];
  }

  if (appKey) store.commit('app/setSelectedGlobalAppKey', appKey);
  store.commit('app/setSelectedGlobalMenuKey', menuKey);
}

// eslint-disable-next-line no-unused-vars
export default async (to, from, failure) => {
  if (failure) return;
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
  loggingIfNeeded(to);
  setSelectedGlobalKeys(to);
};
