import { last } from 'lodash-es';
import consts from '../../../consts';

export default () => {
  const router = useRouter();
  const { getters } = useStore();

  const homeKey = consts.ROUTE_HOME_NAME;
  const homeComponent = router.getRoutes()
    .find((v) => v.name === homeKey).components.default;

  const selectedKey = ref(homeKey);
  const tabItems = shallowReactive([]);

  function addItem(to) {
    const index = tabItems.push({
      key: to.name,
      label: to.meta.menuName,
      component: last(to.matched).components.default,
      componentProps: to.params,
    });

    return tabItems[index - 1];
  }

  function removeItem(tabItem) {
    const index = tabItems.findIndex((v) => v === tabItem);
    tabItems.splice(index, 1);
    return index;
  }

  async function selectItem(key) {
    try {
      await router.push({ name: key });
    } catch (e) {
      // ignore
    }
  }

  async function selectClosestItem(index) {
    const { length } = tabItems;

    if (length > 0) {
      const closestIndex = index === length ? index - 1 : index + 1;
      const closestItem = tabItems[closestIndex];
      await selectItem(closestItem.key);
    } else {
      await selectItem(homeKey);
    }
  }

  const isMenuRoute = (to) => getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isDuplicated = (to) => tabItems.some((v) => v.key === to.name);

  const { currentRoute } = router;
  if (isMenuRoute(currentRoute.value)) {
    const { key } = addItem(currentRoute.value);
    selectedKey.value = key;
  }

  const removeTabsViewHook = router.afterEach(
    (to, from, failure) => {
      if (failure) return;

      const isAddable = isMenuRoute(to) && !isDuplicated(to);
      if (isAddable) addItem(to);

      selectedKey.value = to.name || to.path;
    },
  );

  onBeforeUnmount(() => {
    removeTabsViewHook();
  });

  return {
    homeKey,
    homeComponent,
    selectedKey,
    tabItems,
    addItem,
    removeItem,
    selectItem,
    selectClosestItem,
  };
};
