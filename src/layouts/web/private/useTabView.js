import { last, find, findIndex } from 'lodash-es';
import consts from '../../../consts';

export default () => {
  const router = useRouter();
  const store = useStore();

  const tabViews = shallowReactive([]);
  const selectedKey = computed(() => router.currentRoute.value.name);

  function add(to, from) {
    const index = tabViews.push({
      key: to.name,
      label: to.meta.menuName,
      parentsKey: to.meta.pageUseCode === 'S' ? from?.name : null,
      component: last(to.matched).components.default,
      componentProps: to.params,
    });

    return tabViews[index - 1];
  }

  function remove(key) {
    const index = findIndex(tabViews, { key });
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

  function getClosestKey(key) {
    const index = findIndex(tabViews, { key });
    const lastIndex = tabViews.length - 1;
    const closestIndex = index === lastIndex ? index - 1 : index + 1;
    return tabViews[closestIndex]?.key;
  }

  async function close(key, force = false) {
    const tabView = find(tabViews, { key });
    const isClosable = force === true || (await tabView?.observerVm.confirmIfIsModified() === true);

    if (isClosable) {
      const closestKey = getClosestKey(key);

      remove(key);

      // close selected tab
      if (selectedKey.value === key) {
        await select(closestKey || consts.ROUTE_HOME_NAME);
      }
    }
  }

  const isRegistered = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isUnduplicated = (to) => !tabViews.some((v) => v.key === to.name);

  const removeBeforeEach = router.beforeEach(
    (to, from, next) => {
      const shouldLogging = isRegistered(to) && isUnduplicated(to);
      to.meta.logging = shouldLogging;
      next();
    },
  );
  const removeAfterEach = router.afterEach(
    (to, from, failure) => {
      if (failure) return;

      if (to.meta.logging === true) {
        add(to, from);
      }
    },
  );

  if (isRegistered(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  router.close = async () => {
    const key = selectedKey.value;
    const parentsKey = find(tabViews, { key })?.parentsKey;

    await close(key);

    if (parentsKey) {
      await select(parentsKey);
    }
  };

  onBeforeUnmount(() => {
    removeBeforeEach();
    removeAfterEach();
    delete router.close;
  });

  async function onSelect(key) {
    if (selectedKey.value !== key) {
      await select(key);
    }
  }

  async function onClose(key) {
    await close(key, false);
  }

  return {
    tabViews,
    selectedKey,
    onSelect,
    onClose,
  };
};
