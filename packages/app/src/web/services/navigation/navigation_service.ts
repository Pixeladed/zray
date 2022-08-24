import { OpenSettingsEndpoint } from '../../../interface/bridge/endpoints';
import { BridgeClient } from '../../base/bridge_client';

export class NavigationService {
  constructor(
    private readonly context: Window,
    private readonly bridgeClient: BridgeClient
  ) {}

  currentHref = () => {
    return this.context.location.href;
  };

  openSettings = async () => {
    await this.bridgeClient.request<OpenSettingsEndpoint>('settings:open', {});
  };
}
