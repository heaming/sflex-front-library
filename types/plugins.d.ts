/*
  Quasar
 */
import { Cookies, LocalStorage, SessionStorage } from 'quasar';

export { Cookies, LocalStorage, SessionStorage };
export declare const cookies: Cookies;
export declare const localStorage: LocalStorage;
export declare const sessionStorage: SessionStorage;

/*
  Dialog
 */
declare interface DialogOptions {
  title?: string;
  refocus?: false;
}

declare interface DialogFunction {
  (message: string, options?: DialogOptions): Promise<boolean>;
}

export declare const alert: DialogFunction;
export declare const confirm: DialogFunction;

/*
  Loading
 */
export declare function loadSpinner(value: boolean): void;
export declare function loadProgress(value: number): void;

/*
  Meta
 */
export declare function getConfig(configId: string, fallbackValue: any): any;

/*
  Modal
 */
import { Component } from 'vue';

declare interface ModalOptions {
  component: Component | (() => Promise<Component>);
  componentProps?: Record<string, unknown>;
  beforeClose?: () => boolean;
}

declare interface ModalResult {
  result: boolean;
  payload?: any;
}

export declare function registerPopupsByImportGlob(modules: { [key: string]: any }[]): void;
export declare function modal(options: ModalOptions): Promise<ModalResult>;
