import {
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
  Endpoints,
} from './endpoints';

export const endpointAllowlist: EndpointName<Endpoints>[] = [
  'navigation:settings:open',
  'navigation:openExternal',
  'integration:connect',
  'integration:list',
  'integration:profiles:list',
  'search:global',
];

export type Bridge = {
  request: <E extends Endpoint<any, any, any>>(
    name: EndpointName<E>,
    req: BridgeRequest<E>
  ) => Promise<EndpointRes<E>>;
};

export type BridgeRequest<E extends Endpoint<any, any, any>> = {
  reqId: string;
  data: EndpointReq<E>;
};

export type BridgeResponse<E extends Endpoint<any, any, any>> = {
  reqId: string;
  data: EndpointRes<E>;
};
