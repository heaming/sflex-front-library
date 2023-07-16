import { lowerCase } from 'lodash-es';
import consts from '../consts';
import env from '../consts/private/env';
import { getVm, injectPageContext } from '../utils/private/vm';

// permission value is start at 63
// if has not specific permission then subtract the permission value
// eg. `31 (= 63 - 32)` has no permission for `PRINT`
const PERMISSIONS = {
  [consts.PERMISSION_KEY_PRINT]: 32,
  [consts.PERMISSION_KEY_DOWNLOAD]: 16,
  [consts.PERMISSION_KEY_DELETE]: 8,
  [consts.PERMISSION_KEY_UPDATE]: 4,
  [consts.PERMISSION_KEY_CREATE]: 2,
  [consts.PERMISSION_KEY_READ]: 1,
};

const PERMISSON_KEYS = Object.keys(PERMISSIONS).map(lowerCase);
const PERMISSON_VALUES = Object.values(PERMISSIONS);

const cachedPagePermissionKeys = {};

function getPermissionKeys(permissionValue) {
  const permissionKeys = [];
  let currentValue = permissionValue;
  PERMISSON_VALUES.forEach((v, i) => {
    currentValue -= v;
    if (currentValue >= 0) {
      permissionKeys.push(PERMISSON_KEYS[i]);
    } else {
      currentValue += v;
    }
  });
  return permissionKeys;
}

function cachePagePermissions(pageContext) {
  const { pageId } = pageContext;
  const permissionValue = pageContext.permissions;
  cachedPagePermissionKeys[pageId] = getPermissionKeys(permissionValue);
}

export function hasPermissionKeyInPage(permissionKey, pageContext) {
  if (!PERMISSON_KEYS.includes(permissionKey)) {
    throw new Error(`Invalid permisson value, use value in '${PERMISSON_KEYS}'`);
  }

  if (pageContext) {
    const { pageId } = pageContext;
    if (cachedPagePermissionKeys[pageId] === undefined) {
      cachePagePermissions(pageContext);
    }

    return cachedPagePermissionKeys[pageId].includes(permissionKey);
  }

  return false;
}

function destroyIfHasNoPermissions(binding, vnode) {
  const permissionKey = binding.arg;
  const pageCtx = injectPageContext(vnode);

  if (!hasPermissionKeyInPage(permissionKey, pageCtx)) {
    const { proxy } = getVm(vnode);
    const manualDestroy = proxy.manualDestroy || proxy.$parent.manualDestroy;
    manualDestroy?.();
  }
}

export default (el, binding, vnode) => {
  if (env.TEST === false) {
    destroyIfHasNoPermissions(binding, vnode);
  }
};
