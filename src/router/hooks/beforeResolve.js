import store from '../../store';

function throwIfSubIsNotRoutedFromMain(to, from) {
  const { pageUseCode, parentsMenuUid } = to.meta;
  const shouldThrow = pageUseCode === 'S' && from?.name !== parentsMenuUid;

  if (shouldThrow) {
    throw new Error('sub menu can only routed from it`s parents menu');
  }
}
async function fetchPageIfRequiresAuth(to) {
  if (to.meta.requiresAuth === true) {
    const menuUid = to.name;
    const { pageId } = store.getters['meta/getMenu'](menuUid);
    await store.dispatch('meta/fetchPage', pageId);
  }
}

export default async (to, from, next) => {
  throwIfSubIsNotRoutedFromMain(to, from);
  await fetchPageIfRequiresAuth(to);
  next();
};
