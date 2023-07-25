import env from './private/env';

export default {
  LOCALE_KO: 'ko',
  LOCALE_EN: 'en',

  ENTRY_POPUP_PATHNAME: env.VITE_ENTRY_POPUP_PATHNAME,
  ROUTE_HOME_NAME: 'Home',

  HTTP_ORIGIN: env.VITE_HTTP_ORIGIN,
  HTTP_API_VERSION_PREFIX: env.VITE_HTTP_API_VERSION_PREFIX,
  HTTP_HEADER_PAGE_ID: 'X-PageId',
  HTTP_ERROR_BIZ: 'B',
  HTTP_ERROR_EXCEPTION: 'E',
  HTTP_ERROR_FIELD_ERROR: 'F',
  HTTP_ERROR_REDIRECT: 'R',
  HTTP_ERROR_SESSION_EXPIRED: 'S',
  HTTP_ERROR_SESSION_DUPLICATION: 'U',
  HTTP_ERROR_OAUTH_EXPIRED: 'O',
  HTTP_ERROR_UNSUPPORTED_DEVICE: 'D',

  LOCAL_STORAGE_ACCESS_TOKEN: 'accessToken',
  LOCAL_STORAGE_RECENT_KEYWORD: 'recentKeyword',
  PERMISSION_KEY_PRINT: 'print',
  PERMISSION_KEY_DOWNLOAD: 'download',
  PERMISSION_KEY_DELETE: 'delete',
  PERMISSION_KEY_UPDATE: 'update',
  PERMISSION_KEY_CREATE: 'create',
  PERMISSION_KEY_READ: 'read',

  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',
  DEFAULT_DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  DEFAULT_TIME_FORMAT: 'HH:mm:ss',

  MENU_RECENT_WORK_PREFIX: 'CMM_RECENT_WORK_MENU_UID_',
  CRYPT_AES_ENC_KEY: env.VITE_AES_ENC_KEY,
};
