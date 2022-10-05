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
  'auth:login',
  'auth:logout',
  'auth:check',
];

export const eventAllowlist: EventName<Events>[] = [
  'integration:profile:new',
  'integration:profile:removed',
  'auth:changed',
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
  data: EndpointReq<E>;
};

export type BridgeResponse<E extends Endpoint<any, any, any>> = {
  data: EndpointRes<E>;
};
