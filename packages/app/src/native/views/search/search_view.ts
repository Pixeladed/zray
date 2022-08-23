import { Routes } from '../../../routes';
import { sendToRenderer } from '../../base/bridge_handler';
import { IntegrationNativeService } from '../../services/integration/integration_native_service';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(
    baseSource: WindowSource,
    private readonly integrationNativeService: IntegrationNativeService
  ) {
    super(View.extendWindowSource(baseSource, Routes.search()), {
      frame: false,
      width: 800,
      height: 200,
    });

    const target = this.browserWindow.webContents;
    target.once('dom-ready', () => {
      const profiles = this.integrationNativeService.listProfiles();
      const integrations = this.integrationNativeService.list();
      sendToRenderer(target, 'integration:setAvailable', { integrations });
      sendToRenderer(target, 'integration:setProfiles', { profiles });
    });
  }
}
