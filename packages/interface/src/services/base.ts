export type Endpoint<Req, Res> = (data: Req) => Promise<Res>;

export type EndpointReq<T> = T extends Endpoint<infer Req, any> ? Req : never;
export type EndpointRes<T> = T extends Endpoint<any, infer Res> ? Res : never;
