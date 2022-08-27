import { Assert } from '@highbeam/utils';
import { Bridge } from '../../interface/bridge/bridge';
import {
  BRIDGE_NAMESPACE,
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
} from '../../interface/bridge/endpoints';
import { Event, EventData, EventName } from '../../interface/bridge/events';

export class BridgeClient {
  constructor(private readonly context: Window) {}

  request = async <E extends Endpoint<any, any, any>>(
    name: EndpointName<E>,
    req: EndpointReq<E>
  ): Promise<EndpointRes<E>> => {
    const bridge = this.getBridge();
    const res = await bridge.request(name, req);
    console.groupCollapsed(`[BridgeClient] ${name}`);
    console.log('Request');
    console.dir(req);
    console.log('Response');
    console.dir(res);
    console.groupEnd();
    return res;
  };

  private getBridge = (): Bridge => {
    const key = BRIDGE_NAMESPACE as keyof Window;
    Assert.that(!!this.context[key], `Bridge ${key} does not exist in context`);
    return this.context[key] as Bridge;
  };

  on = async <E extends Event<any, any>>(
    name: EventName<E>,
    callback: (data: EventData<E>) => void
  ) => {
    console.log('listening on', name);
    const bridge = this.getBridge();
    return bridge.on(name, callback);
  };
}
