import path from 'path';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource) {
    super(
      View.extendWindowSource(baseSource, Routes.search()),
      {
        frame: false,
        width: 800,
        height: 200,
      },
      path.join(__dirname, 'preload.js')
    );
  }

  handleActivate = () => {
    if (this.browserWindow) {
      this.browserWindow.show();
    } else {
      this.open();
    }
  };

  handleFocus = () => {
    this.browserWindow?.setOpacity(1);
  };

  handleBlur = () => {
    // this.browserWindow?.hide();
    this.browserWindow?.setOpacity(0.5);
  };

  handleReady = () => {
    // TODO: maybe open an onboarding window etc
  };
}
