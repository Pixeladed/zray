import path from 'path';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SettingsView extends View {
  constructor(baseSource: WindowSource, route: string = Routes.settings()) {
    super(
      View.extendWindowSource(baseSource, route),
      {},
      path.join(__dirname, 'preload.js')
    );
  }
}
