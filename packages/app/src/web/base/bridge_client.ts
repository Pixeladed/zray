import { Assert } from '@highbeam/utils';
import { Bridge } from '../../interface/bridge/bridge';
import {
  BRIDGE_NAMESPACE,
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
} from '../../interface/bridge/endpoints';

export class BridgeClient {
  constructor(private readonly context: Window) {}

  request = async <E extends Endpoint<any, any, any>>(
    name: EndpointName<E>,
    req: EndpointReq<E>
  ): Promise<EndpointRes<E>> => {
    const bridge = this.getBridge();
    return bridge.request(name, req);
  };

  private getBridge = (): Bridge => {
    const key = BRIDGE_NAMESPACE as keyof Window;
    Assert.that(!!this.context[key], `Bridge ${key} does not exist in context`);
    return this.context[key] as Bridge;
  };
}
