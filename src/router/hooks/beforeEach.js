import { isEmpty, pick, find, kebabCase } from 'lodash-es';
import store from '../../store';
import { GlobalModalVmKey } from '../../consts/private/symbols';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { platform } from '../../plugins/platform';

export const INITIAL_LOCATION = {};

export function recursiveGetParentPath(menuUid) {
  const toMenuPaths = store.getters['meta/getMenuPaths'](menuUid);
  const currentMenu = store.getters['meta/getMenu'](menuUid);
  const currentPageDestinationValue = currentMenu.pageDestinationValue;
  const currentPageName = kebabCase(currentPageDestinationValue.substring(0, currentPageDestinationValue.length - 1));
  const parentMenuUid = currentMenu?.parentsMenuUid;
  const parentMenuPath = find(toMenuPaths, (path) => path.key === parentMenuUid);
  if (parentMenuPath.menuLevel <= 1) return currentPageName;
  return recursiveGetParentPath(parentMenuUid);
}

export default (to, from, next) => {
  setTimeout(() => {
    const isLocatedFromHistory = store.getters['meta/getIsLocatedFromHistory'];
    const modals = getGlobalData(GlobalModalVmKey);

    if (platform.is.desktop && modals.length > 0) {
      next(false);
      return;
    }

    if (isLocatedFromHistory) {
      store.dispatch('meta/fetchLocatedFromHistory', false);
      next(false);
    } else {
      modals.forEach((modal) => removeGlobalData(modal.uid));
    }

    if (isEmpty(INITIAL_LOCATION)) {
      Object.assign(
        INITIAL_LOCATION,
        pick(to, ['path', 'query']),
      );
      next('/');
    } else if (to.meta.pageUseCode === 'S' && from.fullPath === '/') {
      const targetPath = recursiveGetParentPath(to.meta.menuUid);
      const splitedPath = to.fullPath.split(`/${targetPath}`);
      window.history.replaceState({}, '');
      next(splitedPath[0]);
    } else {
      to.meta.redirectedFrom = undefined;
      to.meta.logging = false;
      next();
    }
  });
};
