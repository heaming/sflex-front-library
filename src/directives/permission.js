import { lowerCase } from 'lodash-es';
import { getVm, injectPageContext } from '../utils/private/vm';

// permission value is start at 63
// if has not permission specific case that below
// subtract the value that matched specific case
// eg. `31 (= 63 - 32)` has no permission for `PRINT`
const PERMISSIONS = {
  PRINT: 32,
  DOWNLOAD: 16,
  DELETE: 8,
  UPDATE: 4,
  CREATE: 2,
  READ: 1,
};
const PERMISSON_KEYS = Object.keys(PERMISSIONS).map(lowerCase);
const PERMISSON_VALUES = Object.values(PERMISSIONS);

const cachedPagePermissionKeys = {};

function getPermissionKeys(permissionValue) {
  const permissionKeys = [];
  let currentValue = permissionValue;
  PERMISSON_VALUES.forEach((v, i) => {
    currentValue -= v;
    if (currentValue >= 0) permissionKeys.push(PERMISSON_KEYS[i]);
  });
  return permissionKeys;
}

function cacheHasPermissions(pageContext) {
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
      cacheHasPermissions(pageContext);
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
  destroyIfHasNoPermissions(binding, vnode);
};
