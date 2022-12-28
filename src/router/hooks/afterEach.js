import store from '../../store';

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

// eslint-disable-next-line no-unused-vars
export default async (to, from, failure) => {
  assignParamsByQuery(to);
  assignParamsIfIsLinkPage(to);
};
