import { lowerCase, isEmpty } from 'lodash-es';
import { PageContextKey } from '../consts/private/symbols';

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

const cachedHasPermissions = {}; // cached permissions to instance

function throwIfInvalidPermissionKey(permissionKey) {
  if (!PERMISSON_KEYS.includes(permissionKey)) {
    throw new Error(`Invalid permisson value, use value in '${PERMISSON_KEYS}'`);
  }
}

function getInternalInstance(vnode) {
  return vnode.ref.i;
}

function injectPageContext(vnode) {
  const { provides } = getInternalInstance(vnode);
  const pageCtx = provides[PageContextKey] || {};
  if (isEmpty(pageCtx)) {
    throw new Error('The page context is empty. use `v-permisson` in an appropriate place.');
  }
  return pageCtx;
}

const getPermissionKeys = (permissionValue) => {
  const permissionKeys = [];
  let currentValue = permissionValue;
  PERMISSON_VALUES.forEach((v, i) => {
    currentValue -= v;
    if (currentValue >= 0) permissionKeys.push(PERMISSON_KEYS[i]);
  });
  return permissionKeys;
};

function cacheHasPermissions(vnode, permissionKey) {
  const pageCtx = injectPageContext(vnode);
  const permissionValue = pageCtx.permissions;
  const permissionKeys = getPermissionKeys(permissionValue);
  const { uid } = getInternalInstance(vnode);
  cachedHasPermissions[uid] = permissionKeys.includes(permissionKey);
}

function removeCachedHasPermissions(vnode) {
  const { uid } = getInternalInstance(vnode);
  cacheHasPermissions[uid] = null;
  delete cacheHasPermissions[uid];
}

function hasPermission(el, binding, vnode) {
  const { uid } = getInternalInstance(vnode);
  if (cachedHasPermissions[uid] === undefined) {
    try {
      const permissionKey = binding.arg;
      throwIfInvalidPermissionKey(permissionKey);
      cacheHasPermissions(vnode, permissionKey);
    } catch (e) {
      cachedHasPermissions[uid] = false;
      throw e;
    }
  }
  return cachedHasPermissions[uid];
}

function hideElementIfHasNoPermissions(el, binding, vnode) {
  if (!hasPermission(el, binding, vnode)) {
    el.style.display = 'none';
  }
}

export default {
  mounted(el, binding, vnode) {
    hideElementIfHasNoPermissions(el, binding, vnode);
  },
  updated(el, binding, vnode) {
    hideElementIfHasNoPermissions(el, binding, vnode);
  },
  beforeUnmount(el, binding, vnode) {
    removeCachedHasPermissions(vnode);
  },
};
