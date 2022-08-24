import {
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
  Endpoints,
} from './endpoints';

export const endpointAllowlist: EndpointName<Endpoints>[] = [
  'settings:open',
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
