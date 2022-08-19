import { ipcMain } from 'electron';
import path from 'path';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';
import { SearchMessages } from './preload';

export class SearchView extends View {
  constructor(
    baseSource: WindowSource,
    private readonly openSettings: () => void
  ) {
    super(
      View.extendWindowSource(baseSource, Routes.search()),
      {
        frame: false,
        width: 800,
        height: 200,
      },
      path.join(__dirname, 'preload.js')
    );

    ipcMain.handle(SearchMessages.openSettings, this.openSettings);
  }
}
