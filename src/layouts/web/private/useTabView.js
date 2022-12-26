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

  async function close(tabKey, force = false) {
    const tabView = tabViews.find((e) => e.key === tabKey);
    const isClosable = force === true || (await tabView?.observerVm.confirmIfIsModified() === true);

    if (isClosable) {
      const removedIndex = remove(tabView);
      const isSelected = selectedKey.value === tabView.key;

      if (isSelected) {
        selectClosest(removedIndex);
      }
    }
  }

  const isRegistered = (to) => getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isUnduplicated = (to) => !tabViews.some((v) => v.key === (to.name || to.path));

  if (isRegistered(router.currentRoute.value)) {
    const { key } = add(router.currentRoute.value);
    selectedKey.value = key;
  }

  const removeBeforeResolve = router.beforeResolve((to) => {
    const shouldLogging = isRegistered(to) && isUnduplicated(to);

    to.meta.logging = shouldLogging;
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

  router.close = () => close(selectedKey.value);
  onBeforeUnmount(() => {
    removeBeforeResolve();
    removeAfterEach();
    delete router.close;
  });

  async function onSelect(tabKey) {
    if (selectedKey.value !== tabKey) {
      await select(tabKey);
    }
  }

  async function onClose(tabKey) {
    await close(tabKey, false);
  }

  return {
    tabViews,
    selectedKey,
    onSelect,
    onClose,
  };
};
