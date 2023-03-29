import { last, findIndex } from 'lodash-es';

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
        if (index >= 0) stackViews.splice(index + 1);
      }

      add(to);
    }
  });

  if (isMenu(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  onBeforeUnmount(() => {
    removeAfterEach();
  });

  return {
    selectedKey,
    stackViews,
  };
};
