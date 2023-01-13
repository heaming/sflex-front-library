// createApp
import { App, Component, Plugin } from 'vue';
interface CreateAppOptions {
  devicePlatform?: 'desktop' | 'mobile' | 'tablet';
  components?: Component[];
  plugins?: Plugin[];
  routes?: RouteRecordRaw[];
  storeModules?: ModuleTree<any>;
}
export function createApp(rootComponent: Component, options?: CreateAppOptions): App<Element>;

// Consts
export const consts: {
  LOCALE_KO: 'ko';
  LOCALE_EN: 'en';

  ENTRY_POPUP_PATHNAME: string;
  ROUTE_HOME_NAME: 'Home';

  HTTP_ORIGIN: string;
  HTTP_API_VERSION_PREFIX: string;
  HTTP_HEADER_PAGE_ID: 'X-PageId';
  HTTP_ERROR_BIZ: 'B';
  HTTP_ERROR_EXCEPTION: 'E';
  HTTP_ERROR_FIELD_ERROR: 'F';
  HTTP_ERROR_REDIRECT: 'R';
  HTTP_ERROR_SESSION_EXPIRED: 'S';
  HTTP_ERROR_OAUTH_EXPIRED: 'O';
  HTTP_ERROR_UNSUPPORTED_DEVICE: 'D';

  LOCAL_STORAGE_ACCESS_TOKEN: 'accessToken';

  PERMISSION_KEY_PRINT: 'print';
  PERMISSION_KEY_DOWNLOAD: 'download';
  PERMISSION_KEY_DELETE: 'delete';
  PERMISSION_KEY_UPDATE: 'update';
  PERMISSION_KEY_CREATE: 'create';
  PERMISSION_KEY_READ: 'read';

  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD';
  DEFAULT_DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss';
  DEFAULT_TIME_FORMAT: 'HH:mm:ss';
};

// I18n
import { VueI18n } from 'vue-i18n';
export const i18n: VueI18n;

// Store
import { Store, ModuleTree } from 'vuex';
export const store: Store<any>;

// Router
import { Router, RouteRecordRaw } from 'vue-router';
export const router: Router;
export function createRoutesByGlobImport(modules: { [key: string]: any }[]): RouteRecordRaw[];

declare module 'vue-router' {
  export interface Router {
    /**
     * 웹 어플리케이션의 탭 뷰가 있을 때만 정의되어 있는 속성으로,
     * 호출 시 현재 탭을 닫는다.
     * @param force default `false`
     */
    close?: (force?: boolean) => Promise<void>;
  }
}

// Modal
export function registerPopupsByGlobImport(modules: { [key: string]: any }[]): void;

// Validation
export function validate(
  value: unknown,
  rules: string | object | Function,
  options?: {
    name?: string;
    values?: Record<string, unknown>;
    customMessages?: Record<string, string>;
    bails?: boolean;
  },
): string | boolean | Promise<string | boolean>;
