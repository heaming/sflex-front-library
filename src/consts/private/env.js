// https://vitejs-kr.github.io/guide/env-and-mode.html
const env = __VUE_IMPORT_META_ENV__;

const isLocal = window.location.host.startsWith('localhost:');
const isServer = env.PROD && !isLocal;

export default {
  ...env,

  VERSION: env.VERSION,
  TIMESTAMP: env.TIMESTAMP,

  LOCAL: isLocal,
  SERVER: isServer,
  TEST: __VUE_TEST_APP__ === true,

  VITE_ENTRY_POPUP_PATHNAME: env.VITE_POPUP_PATHNAME || '/popup',

  VITE_TENANT_ID: env.VITE_TENANT_ID,
  VITE_PORTAL_ID: env.VITE_PORTAL_ID,

  VITE_LOGIN_URL: isLocal ? undefined : env.VITE_LOGIN_URL,
  VITE_LOGOUT_URL: isLocal ? undefined : env.VITE_LOGOUT_URL,

  VITE_HTTP_ORIGIN: isServer ? window.location.origin : env.VITE_HTTP_ORIGIN,
  VITE_HTTP_API_VERSION_PREFIX: env.VITE_HTTP_API_VERSION_PREFIX,
  VITE_HTTP_TIMEOUT: parseInt(env.VITE_HTTP_TIMEOUT, 10),
  VITE_HTTP_CUST_ORIGIN: env.VITE_HTTP_CUST_ORIGIN,

  VITE_CDN_ORIGIN: env.VITE_CDN_ORIGIN || null,
  VITE_AES_ENC_KEY: env.VITE_AES_ENC_KEY || null,

  VITE_REALGRID_LIC: env.VITE_REALGRID_LIC,
  VITE_REALGRID_STATUSBAR: env.VITE_REALGRID_STATUSBAR === 'true',
  VITE_REALGRID_HIDE_DELETE_ROWS: env.VITE_REALGRID_HIDE_DELETE_ROWS !== 'false',
};
