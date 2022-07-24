/*
  useGlobal
  */
declare interface KwVueGlobals {}

export function useGlobal(): KwVueGlobals;

/*
  useDataService
  */
import { AxiosInstance } from 'axios';

export function useDataService(): AxiosInstance;

/*
  useSession
  */
export function useSession(): {
  isReady(): Promise<void>;
  login(loginId: string, password: string): Promise<void>;
  logout(): Promise<void>;
};
