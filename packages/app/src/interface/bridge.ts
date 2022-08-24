import { IpcRendererEvent } from 'electron';
import { SearchResult } from '../native/services/search/search_native_service';
import { IntegrationInfo, IntegrationProfile } from './intergration';

export const BRIDGE_NAMESPACE = 'contextBridge';

export type Bridge = {
  invoke: <T extends typeof allowlist[number]>(
    message: T,
    params: MessageParam[T]
  ) => void;

  on: <T extends typeof events[number]>(
    message: T,
    cb: (event: IpcRendererEvent, param: MessageParam[T]) => void
  ) => void;
};

export type MessageParam = {
  'settings:open': OpenSettingsParam;
  'integration:connect': ConnectIntegrationParam;
  'integration:setAvailable': SetAvailableIntegrationsParam;
  'integration:setProfiles': SetIntegrationProfilesParam;
  'page:init': PageInitParam;
  'search:request': SearchRequestParam;
  'search:response': SearchResponseParam;
};

export const allowlist: BridgeMessage[] = [
  'settings:open',
  'integration:connect',
  'page:init',
  'search:request',
];

export const events: BridgeMessage[] = [
  'integration:setAvailable',
  'integration:setProfiles',
  'search:response',
];

export type OpenSettingsParam = {};

export type PageInitParam = {};

export type ConnectIntegrationParam = { id: string };

export type SetAvailableIntegrationsParam = {
  integrations: readonly IntegrationInfo[];
};

export type SetIntegrationProfilesParam = {
  profiles: readonly IntegrationProfile[];
};

export type SearchRequestParam = { id: string; query: string; page?: number };

export type SearchResponseParam = {
  results: readonly SearchResult[];
  id: string;
};

export type BridgeMessage = keyof MessageParam;
