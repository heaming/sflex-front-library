const env = __IMPORT_META_ENV__;

export default {
  ...env,

  // RealGrid license
  VITE_REALGRID_LIC: env.VITE_REALGRID_LIC,

  // HTTP
  VITE_HTTP_ORIGIN: env.PROD ? window.location.origin : env.VITE_HTTP_ORIGIN,
  VITE_HTTP_API_VERSION_PREFIX: env.VITE_HTTP_API_VERSION_PREFIX || '/api/v1/',
  VITE_HTTP_TIMEOUT: parseInt(env.VITE_HTTP_TIMEOUT || 30000, 10),
};
