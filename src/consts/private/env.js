const env = __IMPORT_META_ENV__;

const isLocal = window.location.hostname.startsWith('localhost');
const isServer = env.PROD && !isLocal;

export default {
  ...env,

  VITE_REALGRID_LIC: env.VITE_REALGRID_LIC,

  VITE_TENANT_ID: env.VITE_TENANT_ID,
  VITE_PORTAL_ID: env.VITE_PORTAL_ID,

  VITE_LOGIN_URL: isLocal ? undefined : env.VITE_LOGIN_URL,
  VITE_LOGOUT_URL: isLocal ? undefined : env.VITE_LOGOUT_URL,

  VITE_HTTP_ORIGIN: isServer ? window.location.origin : env.VITE_HTTP_ORIGIN,
  VITE_HTTP_API_VERSION_PREFIX: env.VITE_HTTP_API_VERSION_PREFIX,
  VITE_HTTP_TIMEOUT: parseInt(env.VITE_HTTP_TIMEOUT, 10),
};
