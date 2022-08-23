// Quasar
import { Cookies, LocalStorage, SessionStorage } from 'quasar';
export { Cookies, LocalStorage, SessionStorage };
export declare const cookies: Cookies;
export declare const localStorage: LocalStorage;
export declare const sessionStorage: SessionStorage;

// Dialog
declare function DialogFunction(
  /**
   * 다이얼로그에 표시할 내용
   */
  message: string,

  /**
   * 다이얼로그에 표시할 타이틀
   */
  options?: {
    /**
     * 다이얼로그에 표시할 타이틀
     */
    title?: string;

    /**
     * 다이얼로그가 닫힌 후 이전 포커스 객체로 다시 포커스할지 여부
     */
    refocus?: false;
  },
): Promise<boolean>;
export declare const alert: DialogFunction;
export declare const confirm: DialogFunction;

// HTTP
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
export declare interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  /**
   * API 호출 시 스피너 표시 여부
   * @defaultValue true
   */
  spinner?: boolean;

  /**
   * API 호출 결과가 에러 시 다이얼로그 표시 여부, 서버에서 발생한 에러에만 적용 된다.
   * @defaultValue true
   */
  alert?: boolean;
}
export declare interface CustomAxiosInstance {
  (config: CustomAxiosRequestConfig): AxiosPromise;
  (url: string, config?: CustomAxiosRequestConfig): AxiosPromise;
  getUri(config?: CustomAxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: CustomAxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRCustomAxiosRequestConfigequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CustomAxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: CustomAxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: CustomAxiosRequestConfig<D>): Promise<R>;
}
export declare const http: CustomAxiosInstance;

// Loading
export declare function loadSpinner(
  /**
   * 스피너를 표시할지 여부
   */
  value: boolean,
): void;
export declare function loadProgress(
  /**
   * 프로그래스 진행 값
   * 0이면 프로그래스를 해제한다.
   */
  value: number,
): void;

// Meta
export declare function getConfig<T = any>(
  /**
   * configuration ID
   */
  configId: string,

  /**
   * 매핑 값 없을때 설정 값
   */
  fallbackValue?: any,
): string | T;

// Modal
import { Component } from 'vue';
declare type AsyncComponent = () => Promise<Component>;
export declare function modal(options: {
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
   * 팝업이 닫히기 전에 호출되는 콜백
   * return false 시, 팝업 닫는 프로세스를 중단한다.
   */
  beforeClose?: () => boolean;
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
export declare function registerPopupsByImportGlob(modules: { [key: string]: any }[]): void;
