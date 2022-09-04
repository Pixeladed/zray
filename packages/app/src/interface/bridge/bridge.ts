import {
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
  Endpoints,
} from './endpoints';
import { Event, EventData, EventName, Events } from './events';

export const endpointAllowlist: EndpointName<Endpoints>[] = [
  'navigation:settings:open',
  'navigation:openExternal',
  'integration:connect',
  'integration:list',
  'integration:profiles:list',
  'integration:profiles:remove',
  'search:global',
];

export const eventAllowlist: EventName<Events>[] = [
  'integration:profile:new',
  'integration:profile:removed',
];

export type Bridge = {
  request: <E extends Endpoint<any, any, any>>(
    name: EndpointName<E>,
    req: BridgeRequest<E>
  ) => Promise<EndpointRes<E>>;

  on: <E extends Event<any, any>>(
    name: EventName<E>,
    callback: (data: EventData<E>) => void
  ) => void;
};

export type BridgeRequest<E extends Endpoint<any, any, any>> = {
  accessToken: string;
  data: EndpointReq<E>;
};

export type BridgeResponse<E extends Endpoint<any, any, any>> = {
  data: EndpointRes<E>;
};
