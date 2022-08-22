import { IntegrationInfo } from '../web/services/integrations';

export const BRIDGE_NAMESPACE = 'contextBridge';

export type Bridge = {
  invoke: <T extends typeof allowlist[number]>(
    message: T,
    params: MessageParam[T]
  ) => void;

  integrations: readonly IntegrationInfo[];
};

export type MessageParam = {
  'settings:open': OpenSettingsParam;
  'integration:connect': ConnectIntegrationParam;
};

export const allowlist: BridgeMessage[] = [
  'settings:open',
  'integration:connect',
];

export type OpenSettingsParam = {};

export type ConnectIntegrationParam = { id: string };

export type BridgeMessage = keyof MessageParam;
