import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource) {
    super(View.extendWindowSource(baseSource, Routes.search()), {
      frame: false,
      width: 800,
      height: 400,
    });
  }
}
