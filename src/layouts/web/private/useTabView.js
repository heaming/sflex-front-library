import { last, filter, find, findIndex, map, cloneDeep } from 'lodash-es';
import consts from '../../../consts';
import env from '../../../consts/private/env';
import { confirm } from '../../../plugins/dialog';

const TAB_MAX_COUNT = 10;

export default () => {
  const { t } = useI18n();
  const router = useRouter();
  const store = useStore();

  const tabViews = ref([]);
  const tabs = computed(() => filter(tabViews.value, { parentsKey: false }));
  const selectedKey = computed(() => router.currentRoute.value.name);

  function recursiveGetChildren(key) {
    const children = filter(tabViews.value, { parentsKey: key });
    const childrenWithSiblings = [];
    children.forEach((child) => {
      childrenWithSiblings.push(child);
      childrenWithSiblings.push(...recursiveGetChildren(child.key));
    });
    return childrenWithSiblings;
  }

  function recursiveGetParents(key) {
    const parentsKey = find(tabViews.value, { key })?.parentsKey;
    const matchedParents = filter(tabViews.value, { key: parentsKey });
    const parentsWithSiblings = [];
    matchedParents.forEach((parent) => {
      parentsWithSiblings.push(parent);
      parentsWithSiblings.push(...recursiveGetParents(parent.key));
    });
    return parentsWithSiblings;
  }

  function getChildren(key, iteratee = (e) => e) {
    const matched = find(tabViews.value, { key });
    const children = matched ? [matched, ...recursiveGetChildren(key)] : [];
    return map(children, iteratee);
  }

  function getParents(key, iteratee = (e) => e) {
    const matched = find(tabViews.value, { key });
    const parents = matched ? [matched, ...recursiveGetParents(key)] : [];
    return map(parents, iteratee);
  }

  async function confirmIsModified(key) {
    const children = getChildren(key);
    const isModified = children.some((e) => e?.observerVm.isModified() === true);
    return !isModified || confirm(t('MSG_ALT_HIS_TAB_MOD'));
  }

  const preventReload = (event) => {
    if (!env.LOCAL) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  function add(to) {
    const {
      name, meta, matched, params, path,
    } = to;

    Object.assign(params, Object.freeze(router.options?.history?.state?.stateParam));

    const index = tabViews.value.push({
      key: name,
      path,
      label: meta.menuName,
      parentsKey: meta.pageUseCode === 'S' ? meta.parentsMenuUid : false,
      component: last(matched).components.default,
      componentProps: params,
      refresh: 1,
    });

    window.removeEventListener('beforeunload', preventReload);
    window.addEventListener('beforeunload', preventReload);
    return tabViews.value[index - 1];
  }

  function remove(key) {
    const keys = getChildren(key, 'key');

    while (keys.length) {
      const _key = keys.pop();
      const index = findIndex(tabViews.value, { key: _key });
      tabViews.value.splice(index, 1);
    }
    if (tabViews.value.length === 0) {
      window.removeEventListener('beforeunload', preventReload);
    }
  }

  async function select(key, param = null) {
    try {
      if (param) await router.push({ name: key, state: { stateParam: param } });
      else await router.push({ name: key });
    } catch (e) {
      // ignore
    }
  }

  function getClosestKey(key) {
    const index = findIndex(tabViews.value, { key });
    const lastIndex = tabViews.value.length - 1;
    const parents = getParents(key);
    const me = find(parents, (parent) => parent.key === key);
    const parentKeyIndex = findIndex(tabViews.value, (tabView) => tabView.key === me?.parentsKey);
    const closestIndex = index === lastIndex ? index - 1 : index + 1;
    let result;
    if (parentKeyIndex >= 0) result = tabViews.value[parentKeyIndex].key;
    else if (tabViews.value[closestIndex]?.parentsKey) result = getClosestKey(tabViews.value[closestIndex]?.key);
    else result = tabViews.value[closestIndex]?.key;
    return result;
  }

  async function close(key, force = false, autoSelect = true, goToHome = false, param = null) {
    const isClosable = force === true
      || await confirmIsModified(key) === true;

    if (isClosable) {
      // must get closest key before remove
      const closestKey = getClosestKey(key);
      remove(key);

      // when close current selected tab
      if (!goToHome && autoSelect && selectedKey.value === key) {
        await select(closestKey || consts.ROUTE_HOME_NAME, param);
      } else if (goToHome) await select(consts.ROUTE_HOME_NAME);
    }

    return isClosable;
  }

  function closeByIndex(index, force, autoSelect) {
    const { key } = tabViews.value[index];
    return close(key, force, autoSelect);
  }

  const isMenu = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined || store.getters['meta/getNoMenuPage'](to.meta.pageId) !== undefined;
  const isDuplicated = (to) => tabViews.value.some((v) => v.key === to.name);

  const isAncestor = (from, to) => {
    let parentUid = from.meta?.parentsMenuUid;
    const ancestorUid = to.meta?.menuUid;
    while (parentUid && parentUid !== null && parentUid !== '' && parentUid !== '/') {
      if (parentUid === ancestorUid) {
        return true;
      }
      const matched = find(tabViews.value, { key: parentUid });
      if (!matched) break;
      parentUid = matched.parentsKey;
    }
    return false;
  };

  const reomveDescendants = (to) => {
    let parentsKey = to.name;

    while (parentsKey) {
      const matched = find(tabViews.value, { parentsKey });
      if (matched) {
        const delIndex = findIndex(tabViews.value, { parentsKey });
        parentsKey = matched.key;
        if (delIndex > 0) {
          tabViews.value.splice(delIndex, 1);
        }
      } else {
        break;
      }
    }
  };

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

      const isAlreadyExists = findIndex(tabViews.value, { key: toMenuUid }) > -1;

      if (!toIsParents && !fromIsParents && !isSiblings && !isAlreadyExists) {
        throw new Error(`Navigation aborted to ${to.fullPath}, sub route can only routed from it's parents.`);
      }
    }
  }

  let routingIsBlocked = false;
  const removeBeforeEach = router.beforeEach(
    async (to, from, next) => {
      if (routingIsBlocked === true) {
        next(false);
        return;
      }

      // redirect if subpage is already opened
      if (!isAncestor(from, to)) {
        const parentsKey = to.meta.menuUid;
        const matched = find(tabViews.value, { parentsKey });
        if (matched && matched.key !== from.name) {
          from.meta.redirectedFrom = to;
          next({ name: matched.key });
          return;
        }
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

  const removeBeforeResolve = router.beforeResolve(async (to, from, next) => {
    throwIfInvalidRoute(to, from);
    next();
  });

  const removeAfterEach = router.afterEach(
    (to, from, failure) => {
      if (failure) return;

      if (to.meta.logging === true) {
        add(to, from);
      } else {
        // tabView가 이미 떠 있는 상황이면 tabView를 추가하지 못하면서,
        // router.push 에 state로 params를 넘겨줄 경우 받아내지 못한다.
        // 그래서 화면이 이동했을 때 meta.logging 이 false 이면 해당 tabview를 찾아내서 그 tabview에 props를 넣어줌
        const { params } = to;
        Object.assign(params, Object.freeze(router.options?.history?.state?.stateParam));

        // router.push 등으로 이동한 경우
        // 서브페이지인데, to가 부모페이지(혹은 조상님)인 경우 tabView 에서 삭제해야함.
        if (isAncestor(from, to)) {
          reomveDescendants(to);
        }

        // siblings 여도 from을 삭제.
        if (to.meta.pageUseCode === 'S'
            && to.meta.parentsMenuUid === from.meta.parentsMenuUid
            && to.name !== from.name) {
          const delIndex = findIndex(tabViews.value, { key: from.name });
          if (delIndex > 0) {
            tabViews.value.splice(delIndex, 1);
          }
        }
        const tabView = tabViews.value.find((v) => v.key === to.name);
        if (tabView !== undefined) {
          const { componentProps } = tabView;
          const obj = {
            ...componentProps, ...params,
          };
          tabView.componentProps = cloneDeep(obj);
        }
      }
    },
  );

  if (isMenu(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  router.close = async (delta = 0, force = false, params = null) => {
    const parents = getParents(selectedKey.value);
    const index = Math.max(0, Math.min(delta, parents.length - 1));
    const target = parents[index];
    const children = getChildren(target.key, 'key');

    const param = {
      closed: true,
      currTimestamp: new Date().getTime(), // watch로 잡을 때, 값이 변하지 않아 watch 이벤트가 발생하지 않을 수 있는 현상 방지 용도
      ...params,
    };

    if (target) {
      const { key, parentsKey } = target;
      await close(key, force, parentsKey !== false, false, param);
      children.forEach(async (child) => {
        await close(child, force, true, false, param);
      });
      if (parentsKey) {
        await select(parentsKey, param);
      }
    }
  };

  onBeforeUnmount(() => {
    removeBeforeEach();
    removeBeforeResolve();
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

  router.closeTab = async (path) => {
    const menuKey = find(tabViews.value, { path })?.key;
    if (menuKey) {
      const children = getChildren(menuKey);
      children.forEach(async (child) => {
        await close(child.key, true, true, tabViews.value.length < 1);
      });
    }
  };

  async function onClose(key) {
    const children = getChildren(key);
    const forceCloseAllTab = await confirmIsModified(key) === true;
    if (forceCloseAllTab) {
      children.forEach(async (child) => {
        await close(child.key, true, true, tabViews.value.length < 1);
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
