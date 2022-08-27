import { Routes } from 'routes';
import { View, WindowSource } from 'native/views/view';

export class SettingsView extends View {
  constructor(baseSource: WindowSource) {
    super(
      { ...baseSource, hash: Routes.settings().absolute },
      {
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
      }
    );
  }
}
