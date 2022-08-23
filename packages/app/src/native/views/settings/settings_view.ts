import { IntegrationInfo } from '../../../interface/intergration';
import { Routes } from '../../../routes';
import { sendToRenderer } from '../../base/bridge_handler';
import { View, WindowSource } from '../view';

export class SettingsView extends View {
  constructor(
    baseSource: WindowSource,
    integrations: readonly IntegrationInfo[]
  ) {
    super(View.extendWindowSource(baseSource, Routes.settings()), {
      width: 600,
      height: 400,
      titleBarStyle: 'hidden',
      titleBarOverlay: true,
    });

    const target = this.browserWindow.webContents;
    target.once('dom-ready', () => {
      sendToRenderer(target, 'integration:setAvailable', { integrations });
    });
  }
}
