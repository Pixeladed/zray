import { ipcMain } from 'electron';
import path from 'path';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';
import { SettingsMessages } from './preload';

export class SettingsView extends View {
  constructor(baseSource: WindowSource) {
    super(
      View.extendWindowSource(baseSource, Routes.settings()),
      {
        titleBarStyle: 'hidden',
      },
      path.join(__dirname, 'preload.js')
    );

    ipcMain.handle(SettingsMessages.connectSlack, () => {
      console.log('connecting slack....');
    });
  }
}
