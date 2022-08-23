import { IpcRendererEvent } from 'electron';
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
};

export const allowlist: BridgeMessage[] = [
  'settings:open',
  'integration:connect',
  'page:init',
];

export const events: BridgeMessage[] = [
  'integration:setAvailable',
  'integration:setProfiles',
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

export type BridgeMessage = keyof MessageParam;
