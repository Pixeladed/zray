export const BRIDGE_NAMESPACE = 'contextBridge';

export type Bridge = {
  openSettings: () => void;
  connectSlack: () => void;
};

export const Messages = {
  navigation: {
    openSettings: 'nav:settings:open',
  },
  slack: {
    connect: 'slack:connect',
  },
};
