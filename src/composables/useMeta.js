import { PageContextKey } from '../consts/private/symbols';
import { hasPermissionKeyInPage } from '../directives/permission';

export default () => {
  const pageCtx = inject(PageContextKey, null);
  const { getters } = useStore();
  const router = useRouter();
  function getUserInfo() {
    return getters['meta/getUserInfo'];
  }

  function getPageInfo() {
    return pageCtx;
  }

  function getConfig(configurationId, fallbackValue) {
    return getters['meta/getConfig'](configurationId)?.configurationValue ?? fallbackValue;
  }

  function getConfigDescription(configurationId, fallbackValue) {
    return getters['meta/getConfig'](configurationId)?.configurationDescription ?? fallbackValue;
  }

  function hasPermission(permissionKey) {
    const newPageCtx = getters['meta/getPage'](router.currentRoute.value.meta.pageId);
    return hasPermissionKeyInPage(permissionKey, pageCtx ?? newPageCtx);
  }

  function hasRoleNickName(roleNickName) {
    const { roles } = getUserInfo();
    return roles.findIndex((v) => v.roleNickName === roleNickName) > -1;
  }

  return {
    getUserInfo,
    getPageInfo,
    getConfig,
    getConfigDescription,
    hasPermission,
    hasRoleNickName,
  };
};
