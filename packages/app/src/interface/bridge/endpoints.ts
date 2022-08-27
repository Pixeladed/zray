import { IntegrationInfo, IntegrationProfile } from '../intergration';
import { SearchResult } from '../search';

export const BRIDGE_NAMESPACE = 'contextBridge';

export type Endpoint<N extends string, Req, Res> = {
  name: N;
  req?: Req;
  res?: Res;
};
export type EndpointName<T> = T extends Endpoint<infer N, any, any> ? N : never;
export type EndpointReq<T> = T extends Endpoint<any, infer Req, any>
  ? Req
  : never;
export type EndpointRes<T> = T extends Endpoint<any, any, infer Res>
  ? Res
  : never;

export type Endpoints =
  | NavigationEndpoints
  | IntegrationEndpoints
  | SearchEndpoints;

export type NavigationEndpoints = OpenSettingsEndpoint | OpenExternalEndpoint;
export type IntegrationEndpoints =
  | ListIntegrationsEndpoint
  | ListProfilesEndpoint
  | ConnectIntegrationEndpoint
  | RemoveProfileEndpoint;
export type SearchEndpoints = GlobalSearchEndpoint;

export type OpenSettingsEndpoint = Endpoint<'navigation:settings:open', {}, {}>;

export type OpenExternalEndpoint = Endpoint<
  'navigation:openExternal',
  { url: string },
  {}
>;

export type ConnectIntegrationEndpoint = Endpoint<
  'integration:connect',
  { id: string },
  { profile: IntegrationProfile }
>;

export type ListIntegrationsEndpoint = Endpoint<
  'integration:list',
  {},
  { integrations: readonly IntegrationInfo[] }
>;

export type ListProfilesEndpoint = Endpoint<
  'integration:profiles:list',
  {},
  { profiles: readonly IntegrationProfile[] }
>;

export type RemoveProfileEndpoint = Endpoint<
  'integration:profiles:remove',
  { integrationId: string; profileId: string },
  {}
>;

export type GlobalSearchEndpoint = Endpoint<
  'search:global',
  { query: string; page?: number },
  { results: readonly SearchResult[] }
>;
