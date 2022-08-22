export interface ExchangeCodeRequest {}

export interface ExchangeCodeResponse {
  accessToken: string;
  userId: string;
  organisationName: string;
  organisationId: string;
}
