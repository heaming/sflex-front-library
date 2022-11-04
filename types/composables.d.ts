// useDataService
import { CustomAxiosInstance } from './plugins';
export function useDataService(pageId: string): CustomAxiosInstance;

// useGlobal
import { KwVueGlobals } from './plugins';
export function useGlobal(): KwVueGlobals;

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
  logout(): void;
};
