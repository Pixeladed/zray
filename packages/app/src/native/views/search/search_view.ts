import path from 'path';
import { HandlerRegistrar } from '../../../base/bridge';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';
import SearchMessages from './messages.json';

export class SearchView extends View {
  constructor(
    baseSource: WindowSource,
    registerHandler: HandlerRegistrar,
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

    registerHandler(SearchMessages.openSettings, this.openSettings);
  }
}
