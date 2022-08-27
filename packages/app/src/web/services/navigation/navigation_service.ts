import {
  OpenExternalEndpoint,
  OpenSettingsEndpoint,
} from 'interface/bridge/endpoints';
import { BridgeClient } from 'web/base/bridge_client';

export class NavigationService {
  constructor(
    private readonly context: Window,
    private readonly bridgeClient: BridgeClient
  ) {}

  currentHref = () => {
    return this.context.location.href;
  };

  isPathActive = (path: string) => {
    const url = new URL(this.currentHref());
    const pathname = url.hash.substring(1);
    return pathname.startsWith(path);
  };

  openSettings = async () => {
    await this.bridgeClient.request<OpenSettingsEndpoint>(
      'navigation:settings:open',
      {}
    );
  };

  openExternal = async (url: string) => {
    await this.bridgeClient.request<OpenExternalEndpoint>(
      'navigation:openExternal',
      { url }
    );
  };
}
