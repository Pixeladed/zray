import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource) {
    const path = Routes.search();
    super(View.extendWindowSource(baseSource, path), {
      frame: false,
      width: 800,
      height: 200,
    });
  }

  handleActivate = () => {
    if (this.browserWindow) {
      this.browserWindow.show();
    } else {
      this.open();
    }
  };

  handleBlur = () => {
    // this.browserWindow?.hide();
  };

  handleReady = () => {
    // TODO: maybe open an onboarding window etc
  };
}
