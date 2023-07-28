import { last, findIndex, map, cloneDeep } from 'lodash-es';
import consts from '../../../consts';

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
      componentProps: { ...params, isBackPage: false },
    });

    return stackViews[index - 1];
  }

  const isMenu = (to) => store.getters['meta/getMenu'](to.meta.menuUid) !== undefined;
  const removeAfterEach = router.afterEach((to, from, failure) => {
    if (failure) return;

    const { params } = to;
    Object.assign(params, Object.freeze(router.options?.history?.state?.stateParam));

    if (isMenu(to)) {
      const key = selectedKey.value;
      const index = findIndex(stackViews, { key });
      if (to.meta.pageUseCode === 'N' && index < 0) { // 메인인데 이전 스택에 없었으면 전체 삭제후 추가
        // if main page then clear all stack
        stackViews.splice(0);
        add(to);
      } else if (index >= 0) { // 메인이거나 서브인데, 이전 스택에 있었으면 componentProps 업데이트해줌
        // clear all stack after current stack
        stackViews.splice(index + 1); // 뒤로가기 일 시, 원래 있던 화면을 삭제한다
        const { componentProps } = stackViews[index];
        let obj;
        if (componentProps.isBackPage) obj = { ...params, ...componentProps, isBackPage: false };
        else obj = { ...componentProps, ...params, isBackPage: false };

        stackViews[index].componentProps = cloneDeep(obj);
      } else add(to); // 새로운 서브페이지 이동 시, 페이지를 stackView에 추가한다
    }
  });

  if (isMenu(router.currentRoute.value)) {
    add(router.currentRoute.value);
  }

  router.close = async (params = null) => {
    const now = stackViews.findIndex((stackView) => stackView.key === selectedKey.value);
    const target = now < 0 ? consts.ROUTE_HOME_NAME : stackViews[now - 1];
    const param = {
      closed: true,
      currTimestamp: new Date().getTime(), // watch로 잡을 때, 값이 변하지 않아 watch 이벤트가 발생하지 않을 수 있는 현상 방지 용도
      isBackPage: true,
      ...params,
    };

    if (target) {
      const { componentProps } = target;
      const obj = {
        ...componentProps, ...param,
      };
      target.componentProps = cloneDeep(obj);
      router.go(-1);
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

      if (!toIsParents && !fromIsParents && !isSiblings) {
        throw new Error(`Navigation aborted to ${to.fullPath}, sub route can only routed from it's parents.`);
      }
    }
  }

  const removeBeforeResolve = router.beforeResolve(async (to, from, next) => {
    throwIfInvalidRoute(to, from);
    next();
  });

  onBeforeUnmount(() => {
    removeAfterEach();
    removeBeforeResolve();
  });

  return {
    selectedKey,
    stackViews,
  };
};
