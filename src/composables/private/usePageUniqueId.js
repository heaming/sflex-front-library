import { PageUniqueIdContextKey } from '../../consts/private/symbols';
import { getComponentName } from '../../utils/private/vm';

export default () => {
  const vm = getCurrentInstance();
  const pageKey = getComponentName(vm.parent);
  const uniqueIds = new Set();

  function createUniqueId(id) {
    return `${pageKey}_${id}`;
  }

  function registerUniqueId(uniqueId) {
    if (uniqueIds.has(uniqueId)) {
      throw new Error(`The ${uniqueId} already exists in page context.`);
    }

    uniqueIds.add(uniqueId);
  }

  function unregisterUniqueId(uniqueId) {
    uniqueIds.delete(uniqueId);
  }

  provide(PageUniqueIdContextKey, {
    createUniqueId,
    registerUniqueId,
    unregisterUniqueId,
  });
};
