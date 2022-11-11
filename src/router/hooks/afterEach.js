import store from '../../store';
import { http } from '../../plugins/http';

function assignParamsByQuery(to) {
  Object.assign(to.params, {
    ...to.query,
  });
}

function assignParamsIfIsLinkPage(to) {
  const {
    pageId,
    pageTypeCode,
    linkPageId,
  } = store.getters['meta/getMenu'](to.name) || {};

  const isLinkPage = pageId && pageTypeCode === 'L';

  if (isLinkPage) {
    const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);

    Object.assign(to.params, {
      ...linkPage?.pageParameter
        .reduce((a, v) => { a[v.pageParameterName] = v.pageParameterValue; return a; }, {}),
    });
  }
}

async function createMenuLog({ meta }) {
  const shouldLogging = !!meta.menuUid && meta.logging === true;

  if (shouldLogging) {
    const logData = {
      menuLogTypeCode: 'MENU',
      menuLogObjectId: meta.menuUid,
      menuName: meta.menuName,
      appId: meta.applicationId,
      pageId: meta.pageId,
    };

    try {
      await http.post('/sflex/common/common/portal/menus/logging', logData, { useSpinner: false });
    } catch (e) {
      // ignore
    }
  }
}

// eslint-disable-next-line no-unused-vars
export default async (to, from, failure) => {
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
  createMenuLog(to);
};
