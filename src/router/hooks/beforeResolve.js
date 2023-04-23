import store from '../../store';

async function throwIfUnauthorized(to) {
  if (to.meta.requiresAuth === true) {
    let pageId;
    const menuUid = to.name;
    if (to.meta.noMenuPage) pageId = to.meta.pageId;
    else pageId = store.getters['meta/getMenu'](menuUid).pageId;

    try {
      await store.dispatch('meta/fetchPage', pageId);
    } catch (e) {
      throw new Error(
        `Unauthoirzed to ${to.fullPath} path.`,
      );
    }
  }
}

export default async (to, from, next) => {
  await throwIfUnauthorized(to);
  next();
};
