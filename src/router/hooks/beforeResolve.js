import store from '../../store';

const isRequiresAuth = (to) => to.meta.requiresAuth === true;

async function fetchPageIfRequiresAuth(to) {
  if (isRequiresAuth(to)) {
    const menuUid = to.name;
    const { pageId } = store.getters['meta/getMenu'](menuUid);
    await store.dispatch('meta/fetchPage', pageId);
  }
}

export default (async (to, from, next) => {
  await fetchPageIfRequiresAuth(to);
  next();
});
