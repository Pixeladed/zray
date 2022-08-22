export const BRIDGE_NAMESPACE = 'contextBridge';

export type Bridge = {
  invoke: <T extends keyof MessageParam>(
    message: T,
    params: MessageParam[T]
  ) => void;
};

export type MessageParam = {
  'settings:open': OpenSettingsParam;
  'integration:connect': ConnectIntegrationParam;
};

export type OpenSettingsParam = {};

export type IntegrationName = 'slack';
export type ConnectIntegrationParam = { name: IntegrationName };

export type BridgeMessage = keyof MessageParam;
