import { last, findIndex, map } from 'lodash-es';

export default () => {
  const router = useRouter();
  const store = useStore();

  const { currentRoute } = router;
  const selectedKey = computed(() => currentRoute.value.name);
  const stackViews = shallowReactive([]);

  function add(to) {
    const { params } = to;

    Object.assign(params, Object.freeze(router.options?.history?.state?.stateParam));

    const index = stackViews.push({
      key: to.name,
      component: last(to.matched).components.default,
      componentProps: params,
    });

    return stackViews[index - 1];
  }

  const isMenu = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const removeAfterEach = router.afterEach((to, from, failure) => {
    if (failure) return;

    if (isMenu(to)) {
      if (to.meta.pageUseCode === 'N') {
        // if main page then clear all stack
        stackViews.splice(0);
      } else {
        // clear all stack after current stack
        const key = selectedKey.value;
        const index = findIndex(stackViews, { key });
        if (index >= 0) stackViews.splice(index);
      }

      add(to);
    }
  });

  if (isMenu(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

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

  const removeBeforeResolve = router.beforeResolve(async (to, from, next) => {
    throwIfInvalidRoute(to, from);
    next();
  });

  onBeforeUnmount(() => {
    removeAfterEach();
    removeBeforeResolve();
  });

  return {
    selectedKey,
    stackViews,
  };
};
