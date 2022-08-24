import { OpenExternalEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { Shell } from 'electron';

export class NavigationNativeService {
  constructor(private readonly shell: Pick<Shell, 'openExternal'>) {}

  openExterenal: Handler<OpenExternalEndpoint> = async (event, { url }) => {
    this.shell.openExternal(url);
    return {};
  };
}
