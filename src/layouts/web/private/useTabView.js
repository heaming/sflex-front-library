/* eslint-disable no-unused-vars */
import { last, filter, find, findIndex, map } from 'lodash-es';
import consts from '../../../consts';
import { alert, confirm } from '../../../plugins/dialog';

const MAX_COUNT = 10;

export default () => {
  const { t } = useI18n();
  const router = useRouter();
  const store = useStore();

  const tabViews = shallowReactive([]);
  const tabs = computed(() => filter(tabViews, { parentsKey: false }));
  const selectedKey = computed(() => router.currentRoute.value.name);

  function recursiveGetChildren(key) {
    const matched = find(tabViews, { parentsKey: key });
    return matched ? [matched, ...recursiveGetChildren(matched.key)] : [];
  }

  function recursiveGetParents(key) {
    const parentsKey = find(tabViews, { key })?.parentsKey;
    const matched = find(tabViews, { key: parentsKey });
    return matched ? [matched, ...recursiveGetParents(matched.key)] : [];
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

    return tabViews[index - 1];
  }

  function remove(key) {
    const keys = getChildren(key, 'key');

    while (keys.length) {
      const _key = keys.pop();
      const index = findIndex(tabViews, { key: _key });
      tabViews.splice(index, 1);
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
    const closestIndex = index === lastIndex ? index - 1 : index + 1;
    return tabViews[closestIndex]?.key;
  }

  async function close(key, force = false, autoSelect = true) {
    const isClosable = force === true
      || await confirmIsModified(key) === true;

    if (isClosable) {
      // must get closest key before remove
      const closestKey = getClosestKey(key);

      remove(key);

      // when close current selected tab
      if (autoSelect && selectedKey.value === key) {
        await select(closestKey || consts.ROUTE_HOME_NAME);
      }
    }

    return isClosable;
  }

  const isMenu = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isDuplicated = (to) => tabViews.some((v) => v.key === to.name);

  const removeBeforeEach = router.beforeEach(
    async (to, from, next) => {
      // redirect if subpage is already opened
      const parentsKey = to.meta.menuUid;
      const matched = find(tabViews, { parentsKey });

      if (matched) {
        from.meta.redirectedFrom = to;
        next({ name: matched.key });
        return;
      }

      // check whether already opened
      const shouldLogging = isMenu(to) && !isDuplicated(to);
      to.meta.logging = shouldLogging;

      // always check opened tab count except case subpage
      const isOverCount = tabs.value.length >= MAX_COUNT;
      const shouldPrevent = shouldLogging && isOverCount && to.meta.pageUseCode !== 'S';

      if (shouldPrevent) {
        alert(t('MSG_ALT_HIS_TAB_MAX'));
        next(false);
        return;
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

    if (target) {
      const { key, parentsKey } = target;

      await close(key, force, parentsKey !== false);

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
    if (selectedKey.value !== key) {
      await select(key);
    }
  }

  async function onClose(key) {
    await close(key, false);
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
