const env = __IMPORT_META_ENV__;

export default {
  ...env,

  // RealGrid license
  VITE_REALGRID_LIC: env.VITE_REALGRID_LIC,

  // HTTP
  VITE_HTTP_BASE_URL: env.PROD ? '/' : env.VITE_HTTP_BASE_URL,
  VITE_HTTP_TIMEOUT: parseInt(env.VITE_HTTP_TIMEOUT, 10),
};
