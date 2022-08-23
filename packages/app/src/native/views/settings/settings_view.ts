import { IntegrationInfo } from '../../../interface/intergration';
import { Routes } from '../../../routes';
import { HandlerRegistrar } from '../../base/bridge_handler';
import { View, WindowSource } from '../view';

export class SettingsView extends View {
  constructor(
    baseSource: WindowSource,
    registerHandler: HandlerRegistrar,
    integrations: readonly IntegrationInfo[]
  ) {
    super(View.extendWindowSource(baseSource, Routes.settings()), {
      width: 600,
      height: 400,
      titleBarStyle: 'hidden',
      titleBarOverlay: true,
    });

    registerHandler('page:init', () => {
      this.send('integration:setAvailable', { integrations });
    });
  }
}
