export const BRIDGE_NAMESPACE = 'contextBridge';

export type Bridge = {
  openSettings: () => void;
  connectSlack: () => void;
};

export const NavigationMessages = {
  openSettings: 'nav:settings:open',
};

export const SlackMessages = {
  connect: 'slack:connect',
};
