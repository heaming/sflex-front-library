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
import { Ref } from 'vue';
import { KwComponentNameMap } from './components';
export function getComponentType<K extends keyof KwComponentNameMap>(componentName: K): KwComponentNameMap[K];

declare module '@vue/runtime-core' {
  export function ref<T extends KwComponentNameMap[keyof KwComponentNameMap]>(kwComponent: T): Ref<T | null>;
}

// Consts
export const consts: {
  LOCALE_KO: 'ko';
  LOCALE_EN: 'en';

  ROUTE_HOME_NAME: 'Home';

  HTTP_HEADER_PAGE_ID: 'X-PageId';
  HTTP_ERROR_TYPE_BIZ: 'B';
  HTTP_ERROR_TYPE_EXCEPTION: 'E';
  HTTP_ERROR_TYPE_FIELD_ERROR: 'F';
  HTTP_ERROR_TYPE_REDIRECT: 'R';
  HTTP_ERROR_TYPE_SESSION_EXPIRED: 'S';
  HTTP_ERROR_TYPE_OAUTH_EXPIRED: 'O';
  HTTP_ERROR_TYPE_UNSUPPORTED_DEVICE: 'D';

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

// Modal
export function registerPopupsByImportGlob(modules: { [key: string]: any }[]): void;
