import { BrowserWindow } from 'electron';

export class WindowController {
  private instance?: BrowserWindow;

  constructor(private readonly source: WindowSource) {}

  createWindow = () => {
    const win = new BrowserWindow({ frame: false });

    switch (this.source.type) {
      case 'bundled':
        win.loadFile(this.source.path);
        break;
      case 'server':
        win.loadURL(this.source.url);
        break;
      default:
        throw new Error(`Unknown source type ${this.source}`);
    }

    this.instance = win;
    return this.instance;
  };

  handleActivate = () => {
    if (this.instance) {
      this.instance.show();
    } else {
      this.createWindow();
    }
  };

  handleBlur = () => {
    this.instance?.hide();
  };
}

export type WindowSource =
  | { type: 'bundled'; path: string }
  | { type: 'server'; url: string };
