// createApp
import { App, Component, Plugin } from 'vue';
interface CreateAppOptions {
  components?: Component[];
  plugins?: Plugin[];
  routes?: RouteRecordRaw[];
  storeModules?: ModuleTree<any>;
}
export function createApp(rootComponent: Component, options?: CreateAppOptions): App<Element>;

// getComponentType
import { KwComponentNameMap } from './components';
export function getComponentType<K extends keyof KwComponentNameMap>(componentName: K): KwComponentNameMap[K];

// Consts
export const consts: {
  // App
  LOCALE_KO: 'ko';
  LOCALE_EN: 'en';

  // HTTP
  HTTP_HEADER_PAGE_ID: 'X-PageId';
  HTTP_ERROR_TYPE_BIZ: 'B';
  HTTP_ERROR_TYPE_EXCEPTION: 'E';
  HTTP_ERROR_TYPE_FIELD_ERROR: 'F';
  HTTP_ERROR_TYPE_REDIRECT: 'R';
  HTTP_ERROR_TYPE_SESSION_EXPIRED: 'S';
  HTTP_ERROR_TYPE_OAUTH_EXPIRED: 'O';
  HTTP_ERROR_TYPE_UNSUPPORTED_DEVICE: 'D';

  // Storage
  LOCAL_STORAGE_ACCESS_TOKEN: '__ACCESS_TOKEN__';
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
