import { autorun } from 'mobx';
import { Routes } from '../../../routes';
import { HandlerRegistrar } from '../../base/bridge_handler';
import { IntegrationNativeService } from '../../services/integration/integration_native_service';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(
    baseSource: WindowSource,
    registerHandler: HandlerRegistrar,
    integrationNativeService: IntegrationNativeService
  ) {
    super(View.extendWindowSource(baseSource, Routes.search()), {
      frame: false,
      width: 800,
      height: 200,
    });

    registerHandler('page:init', () => {
      autorun(() => {
        const profiles = integrationNativeService.profiles.get();
        this.send('integration:setProfiles', { profiles });
      });
      const integrations = integrationNativeService.list();
      this.send('integration:setAvailable', { integrations });
    });
  }
}
