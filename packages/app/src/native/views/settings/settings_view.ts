import path from 'path';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource) {
    super(
      View.extendWindowSource(baseSource, Routes.addIntegration()),
      {},
      path.join(__dirname, 'preload.js')
    );
  }
}
