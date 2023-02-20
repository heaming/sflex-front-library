import { map } from 'lodash-es';
import store from '../../store';

function throwIfInvalidRoute(to, from) {
  const pageUseIsSub = to.meta.pageUseCode === 'S';

  if (pageUseIsSub) {
    // case route sub to parents
    const fromMenuUid = from?.meta.menuUid;
    const fromMenuPaths = store.getters['meta/getMenuPaths'](fromMenuUid);
    const fromParentsMenuUids = map(fromMenuPaths, 'key');

    const toMenuUid = to.meta.menuUid;
    const toIsParents = fromParentsMenuUids.includes(toMenuUid);

    // case route parents to sub
    const toParentsMenuUid = to.meta.parentsMenuUid;
    const actualFrom = from?.meta.redirectedFrom || from;
    const fromIsParents = actualFrom?.meta.menuUid === toParentsMenuUid;

    const isSiblings = to.meta.parentsMenuUid === from.meta.parentsMenuUid;
    if (!toIsParents && !fromIsParents && !isSiblings) {
      throw new Error(`Navigation aborted to ${to.fullPath}, sub route can only routed from it's parents.`);
    }
  }
}

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
  throwIfInvalidRoute(to, from);
  await throwIfUnauthorized(to);
  next();
};
