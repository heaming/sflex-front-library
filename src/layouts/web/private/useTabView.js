import { last } from 'lodash-es';

export default () => {
  const router = useRouter();
  const { getters } = useStore();

  const selectedKey = ref();
  const tabViews = shallowReactive([]);

  function add(to) {
    const index = tabViews.push({
      key: to.name,
      label: to.meta.menuName,
      component: last(to.matched).components.default,
      componentProps: to.params,
    });

    return tabViews[index - 1];
  }

  function remove(tabItem) {
    const index = tabViews.findIndex((v) => v === tabItem);
    tabViews.splice(index, 1);
    return index;
  }

  async function select(key) {
    try {
      await router.push({ name: key });
    } catch (e) {
      // ignore
    }
  }

  async function selectClosest(index) {
    const { length } = tabViews;

    if (length > 0) {
      const closestIndex = index === length ? index - 1 : index + 1;
      const closestItem = tabViews[closestIndex];
      await select(closestItem.key);
    }
  }

  const isMenuRoute = (to) => getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isDuplicated = (to) => tabViews.some((v) => v.key === to.name);

  const { currentRoute } = router;
  if (isMenuRoute(currentRoute.value)) {
    const { key } = add(currentRoute.value);
    selectedKey.value = key;
  }

  const removeBeforeResolve = router.beforeResolve((to) => {
    to.meta.logging = isMenuRoute(to) && !isDuplicated(to);
  });

  const removeAfterEach = router.afterEach(
    (to, from, failure) => {
      if (failure) return;

      // is new tab
      if (to.meta.logging === true) {
        add(to);
      }

      selectedKey.value = to.name || to.path;
    },
  );

  onBeforeUnmount(() => {
    removeBeforeResolve();
    removeAfterEach();
  });

  return {
    tabViews,
    selectedKey,
    add,
    remove,
    select,
    selectClosest,
  };
};
