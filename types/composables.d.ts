// useDataService
import { CustomAxiosInstance } from './plugins';
export function useDataService(pageId: string): CustomAxiosInstance;

// useGlobal
import { QVueGlobals } from 'quasar';
import { cookies, alert, confirm, http, loadSpinner, loadProgress, modal, notify, sanitize, localStorage, sessionStorage } from './plugins';
export function useGlobal(): {
  q: QVueGlobals;
  cookies: typeof cookies;
  alert: typeof alert;
  confirm: typeof confirm;
  http: typeof http;
  loadSpinner: typeof loadSpinner;
  loadProgress: typeof loadProgress;
  modal: typeof modal;
  notify: typeof notify;
  sanitize: typeof sanitize;
  localStorage: typeof localStorage;
  sessionStorage: typeof sessionStorage;
};

// useGnb
import { Ref, ComputedRef } from 'vue';
export function useGnb(): {
  gnbItems: Ref<
    {
      key: string;
      label: string;
    }[]
  >;
  selectedGnbKey: ComputedRef<string | null>;
  isSelected: (gnbKey: string) => boolean;
  updateSelected: (gnbKey: string) => void;
};

// useLnb
import { QTree } from 'quasar';
export function useLnb(): {
  lnbRef: Ref<QTree | undefined>;
  hierarchyedLnbItems: Ref<
    {
      gnbKey: string;
      key: string;
      parentsKey?: string;
      label: string;
      depth: number;
    }[]
  >;
  isExpanded: ComputedRef<boolean>;
  expandedKeys: Ref<string[]>;
  selectedGnbKey: ComputedRef<string | null>;
  selectedLnbKey: ComputedRef<string | null>;
  isSelected: (lnbKey: string) => boolean;
  toggleLnb: () => void;
  onUpdateSelected: (lnbKey: string) => void;
  onUpdateExpanded: (expandedKeys: string[]) => void;
};

// useMeta
export function useMeta(): {
  getUserInfo(): any;
  getPageInfo(): any;
  getConfig(configurationId: string, fallbackValue?: string): string | undefined;
  hasPermission(permissionKey: 'read' | 'create' | 'update' | 'delete' | 'download' | 'print'): boolean;
  hasRoleNickName(roleNickName: string): boolean;
};

// useModal
export function useModal(): {
  ok(payload?: any): void;
  cancel(payload?: any): void;
};

// useSession
export function useSession(): {
  isReady(): Promise<void>;
  login(options: { tenantId?: string; portalId?: string; languageId?: string; loginId: string; password: string }): Promise<void>;
  logout(): Promise<void>;
};
