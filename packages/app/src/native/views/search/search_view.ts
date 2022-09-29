import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource) {
    super(
      {
        ...baseSource,
        hash: Routes.search().absolute,
      },
      {
        width: 800,
        height: 400,
        titleBarOverlay: true,
        titleBarStyle: 'hidden',
      }
    );
  }
}
