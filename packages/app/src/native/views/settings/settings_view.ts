import { HandlerRegistrar } from '../../../base/bridge';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SettingsView extends View {
  constructor(baseSource: WindowSource, registerHandler: HandlerRegistrar) {
    super(View.extendWindowSource(baseSource, Routes.settings()), {
      titleBarStyle: 'hidden',
    });
  }
}
