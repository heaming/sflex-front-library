import './autoImport';

/*
  Core
 */
import { App, Component, Plugin } from 'vue';
import { VueI18n } from 'vue-i18n';
import { Router, RouteRecordRaw } from 'vue-router';
import { Store, ModuleTree } from 'vuex';

declare interface CreateAppOptions {
  components?: Component[];
  plugins?: Plugin[];
  routes?: RouteRecordRaw[];
  storeModules?: ModuleTree<any>;
}

export declare function createApp(rootComponent: Component, options?: CreateAppOptions): App<Element>;
export declare function createRoutesByGlobImport(modules: { [key: string]: any }[]): RouteRecordRaw[];
export declare const i18n: VueI18n;
export declare const store: Store<any>;
export declare const router: Router;

/*
  Composables
 */
export * from './composables';

/*
  Plugins
 */
export * from './plugins';

/*
  Utils
 */
export * from './utils';
