import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SettingsView extends View {
  constructor(baseSource: WindowSource) {
    super(View.extendWindowSource(baseSource, Routes.settings()), {
      width: 600,
      height: 400,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        height: 48,
      },
    });
  }
}
