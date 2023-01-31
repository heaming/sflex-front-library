// Cookies
import { Cookies } from 'quasar';
export { Cookies };
export const cookies: Cookies;

// Dialog
interface DialogOptions {
  /**
   * 표시할 icon
   */
  icon?: string;

  /**
   * 표시할 서브메세지
   */
  subMessage?: string;

  /**
   * 이전 포커스 객체로 다시 포커스할지 여부
   * @defaultValue `true`
   */
  refocus?: boolean;
}

export interface DialogFunction {
  (message: string, options?: DialogOptions): Promise<boolean>;
}

export const alert: DialogFunction;
export const confirm: DialogFunction;

// HTTP
import { AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * API 호출 시 스피너 표시 여부
   * @defaultValue `true`
   */
  spinner?: boolean;

  /**
   * API 호출 결과가 에러 시 다이얼로그 표시 여부, 서버 비즈니스 에러인 경우에만 적용 된다.
   * @defaultValue `true`
   */
  alert?: boolean;

  /**
   * 모든 경우에 적용되며, 스피너 및 다이얼로그 표시하지 않는다.
   * @defaultValue `false`
   */
  silent?: boolean;
}

export interface CustomAxiosInstance {
  (config: CustomAxiosRequestConfig): AxiosPromise;
  (url: string, config?: CustomAxiosRequestConfig): AxiosPromise;
  getUri(config?: CustomAxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: CustomAxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CustomAxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CustomAxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: CustomAxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: CustomAxiosRequestConfig<D>): Promise<R>;
}

export const http: CustomAxiosInstance;

// Loading
export function loadSpinner(value: boolean): void;
export function loadProgress(value: number): void;

// Modal
import { Component } from 'vue';
type AsyncComponent = () => Promise<Component>;

export function modal(options: {
  /**
   * 호출할 컴포넌트명 또는 AsyncComponent
   * 컴포넌트명으로 호출할 시에 권한체크한다.
   */
  component: string | AsyncComponent;

  /**
   * 호출할 컴포넌트에 전달할 Props
   */
  componentProps?: Record<string, unknown>;

  /**
   * 윈도우 팝업으로 호출할지 여부
   */
  window?: boolean;

  /**
   * 윈도우 팝업으로 호출할 때 리다이렉트 케이스 여부, 지정 시 팝업에서 글로벌 닫기 이벤트를 설정하지 않는다.
   */
  redirect?: boolean;
}): Promise<{
  /**
   * 팝업 결과
   */
  result: boolean;

  /**
   * 팝업에서 전달한 페이로드
   */
  payload?: any;
}>;

// Notify
export function notify(message: string): void;

// Platform
export interface Platform {
  is: {
    local: boolean;
    server: boolean;
    test: boolean;
    popup: boolean;
    android: boolean;
    ios: boolean;
    desktop: boolean;
    mobile: boolean;
    tablet: boolean;
  };
}
export const platform: Platform;

// Sanitize
import DOMPurify from 'dompurify';
export const sanitize: typeof DOMPurify.sanitize;

// Storage
import { LocalStorage, SessionStorage } from 'quasar';
export { LocalStorage, SessionStorage };
export const localStorage: LocalStorage;
export const sessionStorage: SessionStorage;

// Component Custom Properties for plugins
import { QVueGlobals } from 'quasar';

export interface KwVueGlobals {
  version: string;
  timestamp?: number;
  q: QVueGlobals;
  cookies: typeof cookies;
  alert: typeof alert;
  confirm: typeof confirm;
  http: typeof http;
  loadSpinner: typeof loadSpinner;
  loadProgress: typeof loadProgress;
  modal: typeof modal;
  notify: typeof notify;
  platform: Platform;
  sanitize: typeof sanitize;
  localStorage: typeof localStorage;
  sessionStorage: typeof sessionStorage;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $g: KwVueGlobals;
  }
  interface ComponentCustomProps {
    [`v-permission:print`]?: boolean;
    [`v-permission:download`]?: boolean;
    [`v-permission:delete`]?: boolean;
    [`v-permission:update`]?: boolean;
    [`v-permission:create`]?: boolean;
    [`v-permission:read`]?: boolean;
  }
}
