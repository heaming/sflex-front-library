import { PageContextKey } from '../../consts/private/symbols';
import { getComponentName } from '../../utils/private/vm';

export default () => {
  const { getters } = useStore();
  const isAuthenticated = getters['meta/isAuthenticated'];

  const pageCtx = {};

  if (isAuthenticated) {
    const vm = getCurrentInstance();
    const pageKey = getComponentName(vm.parent);

    Object.assign(pageCtx, {
      ...getters['meta/getPage'](pageKey),
    });
  }

  provide(PageContextKey, pageCtx);

  return pageCtx;
};
