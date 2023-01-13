/* eslint-disable no-unused-vars */
import { last, filter, find, findIndex } from 'lodash-es';
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

  function recursiveGetKeys(key) {
    const matched = find(tabViews, { parentsKey: key });
    const childrenKeys = matched ? recursiveGetKeys(matched.key) : [];
    return [key, ...childrenKeys];
  }

  function getChildren(key) {
    return recursiveGetKeys(key).map((e) => find(tabViews, { key: e }));
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
    const keys = recursiveGetKeys(key);

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

  const isRegistered = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const isUnduplicated = (to) => !tabViews.some((v) => v.key === to.name);

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
      const shouldLogging = isRegistered(to) && isUnduplicated(to);
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

  if (isRegistered(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  router.close = async (force = false) => {
    const key = selectedKey.value;
    const tabView = find(tabViews, { key });

    if (tabView) {
      const { parentsKey } = tabView;

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
    return recursiveGetKeys(key).includes(selectedKey.value);
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
