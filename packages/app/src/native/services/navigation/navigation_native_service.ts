import { OpenExternalEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { Shell } from 'electron';

export class NavigationNativeService {
  constructor(private readonly shell: Pick<Shell, 'openExternal'>) {}

  openExternal: Handler<OpenExternalEndpoint> = async ({ url }) => {
    this.shell.openExternal(url);
    return {};
  };
}
