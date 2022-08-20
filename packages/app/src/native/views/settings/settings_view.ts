import path from 'path';
import { HandlerRegistrar } from '../../../base/bridge';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';
import { SettingsMessages } from './preload';

export class SettingsView extends View {
  constructor(baseSource: WindowSource, registerHandler: HandlerRegistrar) {
    super(
      View.extendWindowSource(baseSource, Routes.settings()),
      {
        titleBarStyle: 'hidden',
      },
      path.join(__dirname, 'preload.js')
    );

    registerHandler(SettingsMessages.connectSlack, () => {
      console.log('connecting slack....');
    });
  }
}
