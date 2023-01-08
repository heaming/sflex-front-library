import store from '../../store';
import { http } from '../../plugins/http';

function assignParamsByQuery(to) {
  Object.assign(to.params, {
    ...to.query,
  });
}

function assignParamsIfIsLinkPage(to) {
  const matched = store.getters['meta/getMenu'](to.name);

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

    await http.post('/sflex/common/common/portal/menus/logging', logData, { silent: true });
    await store.dispatch('meta/fetchRecentMenus');
  }
}

// eslint-disable-next-line no-unused-vars
export default async (to, from, failure) => {
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
  loggingIfNeeded(to);
};
