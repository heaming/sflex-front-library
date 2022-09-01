import { PageContextKey } from '../consts/private/symbols';
import { hasPermissionKeyInPage } from '../directives/permission';

export default () => {
  const pageCtx = inject(PageContextKey, null);
  const { getters } = useStore();

  function getUserInfo() {
    return getters['meta/getUserInfo'];
  }

  function getPageInfo() {
    return pageCtx;
  }

  function getConfig(configurationId, fallbackValue) {
    return getters['meta/getConfig'](configurationId)?.configurationValue ?? fallbackValue;
  }

  function hasPermission(permissionKey) {
    return hasPermissionKeyInPage(permissionKey, pageCtx);
  }

  function hasRoleNickName(roleNickName) {
    const { roles } = getUserInfo();
    return roles.findIndex((v) => v.roleNickName === roleNickName) > -1;
  }

  return {
    getUserInfo,
    getPageInfo,
    getConfig,
    hasPermission,
    hasRoleNickName,
  };
};
