import { last } from 'lodash-es';

export default () => {
  const router = useRouter();
  const { getters } = useStore();

  const { currentRoute } = router;
  const selectedKey = computed(() => currentRoute.value.name || currentRoute.value.path);
  const stackViews = shallowReactive([]);

  function add(to) {
    const index = stackViews.push({
      key: to.name,
      component: last(to.matched).components.default,
      componentProps: to.params,
    });

    return stackViews[index - 1];
  }

  // eslint-disable-next-line no-unused-vars
  function remove(tabItem) {
    const index = stackViews.findIndex((v) => v === tabItem);
    stackViews.splice(index, 1);
    return index;
  }

  const isRegistered = (to) => getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isUnduplicated = (to) => !stackViews.some((v) => v.key === (to.name || to.path));

  if (isRegistered(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  const removeAfterEach = router.afterEach((to, from, failure) => {
    if (failure) return;

    if (isRegistered(to) && isUnduplicated(to)) {
      add(to);
    }
  });

  onBeforeUnmount(() => {
    removeAfterEach();
  });

  return {
    selectedKey,
    stackViews,
  };
};
