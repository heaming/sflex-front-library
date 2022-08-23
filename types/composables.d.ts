// useDataService
import { CustomAxiosInstance } from './plugins';
export function useDataService(pageId: string): CustomAxiosInstance;

// useGlobal
import { QVueGlobals } from 'quasar';
import { cookies, alert, confirm, http, loadSpinner, loadProgress, getConfig, modal, sanitize, localStorage, sessionStorage } from './plugins';
export function useGlobal(): {
  q: QVueGlobals;
  cookies: typeof cookies;
  alert: typeof alert;
  confirm: typeof confirm;
  http: typeof http;
  loadSpinner: typeof loadSpinner;
  loadProgress: typeof loadProgress;
  getConfig: typeof getConfig;
  modal: typeof modal;
  sanitize: typeof sanitize;
  localStorage: typeof localStorage;
  sessionStorage: typeof sessionStorage;
};

// useModal
export function useModal(): {
  ok(payload: any): void;
  cancel(payload: any): void;
};

// useSession
export function useSession(): {
  isReady(): Promise<void>;
  login(loginId: string, password: string): Promise<void>;
  logout(): Promise<void>;
};
