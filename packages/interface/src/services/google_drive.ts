import { IClient } from '../client';
import { Endpoint } from './base';

export interface OAuthRequest {}
export interface OAuthResponse {}

export interface ExchangeCodeRequest {}
export interface ExchangeCodeResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  name: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface IGoogleDriveService {
  oauth: Endpoint<OAuthRequest, OAuthResponse>;
  exchangeCode: Endpoint<ExchangeCodeRequest, ExchangeCodeResponse>;
  refreshToken: Endpoint<RefreshTokenRequest, RefreshTokenResponse>;
}

export type GoogleDriveClient = IClient<IGoogleDriveService>;
