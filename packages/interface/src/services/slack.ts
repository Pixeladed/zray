import { IClient } from '../client';
import { Endpoint } from './base';

export interface OAuthRequest {}
export interface OAuthResponse {}

export interface ExchangeCodeRequest {}
export interface ExchangeCodeResponse {
  accessToken: string;
  userId: string;
  organisationName: string;
  organisationId: string;
}

export interface ISlackService {
  oauth: Endpoint<OAuthRequest, OAuthResponse>;
  exchangeCode: Endpoint<ExchangeCodeRequest, ExchangeCodeResponse>;
}

export type SlackClient = IClient<ISlackService>;
