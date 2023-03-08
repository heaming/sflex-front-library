import { last, filter, find, findIndex, map } from 'lodash-es';
import consts from '../../../consts';
import { confirm } from '../../../plugins/dialog';

const TAB_MAX_COUNT = 10;

export default () => {
  const { t } = useI18n();
  const router = useRouter();
  const store = useStore();

  const tabViews = shallowReactive([]);
  const tabs = computed(() => filter(tabViews, { parentsKey: false }));
  const selectedKey = computed(() => router.currentRoute.value.name);

  function recursiveGetChildren(key) {
    const children = filter(tabViews, { parentsKey: key });
    const childrenWithSiblings = [];
    children.forEach((child) => {
      childrenWithSiblings.push(child);
      childrenWithSiblings.push(...recursiveGetChildren(child.key));
    });
    return childrenWithSiblings;
  }

  function recursiveGetParents(key) {
    const parentsKey = find(tabViews, { key })?.parentsKey;
    const matchedParents = filter(tabViews, { key: parentsKey });
    const parentsWithSiblings = [];
    matchedParents.forEach((parent) => {
      parentsWithSiblings.push(parent);
      parentsWithSiblings.push(...recursiveGetParents(parent.key));
    });
    return parentsWithSiblings;
  }

  function getChildren(key, iteratee = (e) => e) {
    const matched = find(tabViews, { key });
    const children = matched ? [matched, ...recursiveGetChildren(key)] : [];
    return map(children, iteratee);
  }

  function getParents(key, iteratee = (e) => e) {
    const matched = find(tabViews, { key });
    const parents = matched ? [matched, ...recursiveGetParents(key)] : [];
    return map(parents, iteratee);
  }

  async function confirmIsModified(key) {
    const children = getChildren(key);
    const isModified = children.some((e) => e?.observerVm.isModified() === true);
    return !isModified || confirm(t('MSG_ALT_HIS_TAB_MOD'));
  }

  const preventReload = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };

  function add(to) {
    const {
      name, meta, matched, params,
    } = to;

    const index = tabViews.push({
      key: name,
      label: meta.menuName,
      parentsKey: meta.pageUseCode === 'S' ? meta.parentsMenuUid : false,
      component: last(matched).components.default,
      componentProps: params,
    });

    window.removeEventListener('beforeunload', preventReload);
    window.addEventListener('beforeunload', preventReload);

    return tabViews[index - 1];
  }

  function remove(key) {
    const keys = getChildren(key, 'key');

    while (keys.length) {
      const _key = keys.pop();
      const index = findIndex(tabViews, { key: _key });
      tabViews.splice(index, 1);
    }
    if (tabViews.length === 0) {
      window.removeEventListener('beforeunload', preventReload);
    }
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
    const parents = getParents(key);
    const me = find(parents, (parent) => parent.key === key);
    const parentKeyIndex = findIndex(tabViews, (tabView) => tabView.key === me?.parentsKey);
    const closestIndex = index === lastIndex ? index - 1 : index + 1;
    let result;
    if (parentKeyIndex >= 0) result = tabViews[parentKeyIndex].key;
    else if (tabViews[closestIndex]?.parentsKey) result = getClosestKey(tabViews[closestIndex]?.key);
    else result = tabViews[closestIndex]?.key;
    return result;
  }

  async function close(key, force = false, autoSelect = true, goToHome = false) {
    const isClosable = force === true
      || await confirmIsModified(key) === true;

    if (isClosable) {
      // must get closest key before remove
      const closestKey = getClosestKey(key);
      remove(key);

      // when close current selected tab
      if (!goToHome && autoSelect && selectedKey.value === key) {
        await select(closestKey || consts.ROUTE_HOME_NAME);
      } else if (goToHome) await select(consts.ROUTE_HOME_NAME);
    }

    return isClosable;
  }

  function closeByIndex(index, force, autoSelect) {
    const { key } = tabViews[index];
    return close(key, force, autoSelect);
  }

  const isMenu = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined || store.getters['meta/getNoMenuPage'](to.meta.pageId) !== undefined;
  const isDuplicated = (to) => tabViews.some((v) => v.key === to.name);

  let routingIsBlocked = false;
  const removeBeforeEach = router.beforeEach(
    async (to, from, next) => {
      if (routingIsBlocked === true) {
        next(false);
        return;
      }

      // redirect if subpage is already opened
      const parentsKey = to.meta.menuUid;
      const matched = find(tabViews, { parentsKey });
      if (matched && matched.key !== from.name) {
        from.meta.redirectedFrom = to;
        next({ name: matched.key });
        return;
      }

      // check whether already opened
      const shouldLogging = isMenu(to) && !isDuplicated(to);
      to.meta.logging = shouldLogging;

      // always check opened tab count except case subpage
      const isOverMaxCount = tabs.value.length >= TAB_MAX_COUNT;
      const shouldPrevent = shouldLogging && isOverMaxCount && to.meta.pageUseCode !== 'S';

      if (shouldPrevent) {
        routingIsBlocked = true;
        const isCanceled = await confirm(t('MSG_ALT_HIS_TAB_MAX')) === false;

        if (isCanceled) {
          next(false);
          routingIsBlocked = false;
          return;
        }

        await closeByIndex(0);
        routingIsBlocked = false;
      }

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

  if (isMenu(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  router.close = async (delta = 0, force = false) => {
    const parents = getParents(selectedKey.value);
    const index = Math.max(0, Math.min(delta, parents.length - 1));
    const target = parents[index];
    const children = getChildren(target.key, 'key');

    if (target) {
      const { key, parentsKey } = target;
      await close(key, force, parentsKey !== false);
      children.forEach(async (child) => {
        await close(child, force);
      });
      if (parentsKey) {
        await select(parentsKey);
      }
    }
  };

  onBeforeUnmount(() => {
    removeBeforeEach();
    removeAfterEach();
    delete router.close;
  });

  function isActive(key) {
    return getChildren(key, 'key').includes(selectedKey.value);
  }

  async function onSelect(key) {
    const children = getChildren(key, 'key');
    if (selectedKey.value !== key && !children.includes(selectedKey.value)) {
      await select(key);
    }
  }

  async function onClose(key) {
    const children = getChildren(key);
    const forceCloseAllTab = await confirmIsModified(key) === true;
    if (forceCloseAllTab) {
      children.forEach(async (child) => {
        await close(child.key, true, true, tabViews.length < 1);
      });
    }
  }

  return {
    tabViews,
    tabs,
    selectedKey,
    isActive,
    onSelect,
    onClose,
  };
};
