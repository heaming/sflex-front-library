import store from '../../store';

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

async function fetchRecentMenus(to) {
  const matched = store.getters['meta/getMenu'](to.name);

  if (matched) {
    try {
      await store.dispatch('meta/fetchRecentMenus');
    } catch (e) {
      // ignore
    }
  }
}

// eslint-disable-next-line no-unused-vars
export default async (to, from, failure) => {
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
  fetchRecentMenus(to);
};
