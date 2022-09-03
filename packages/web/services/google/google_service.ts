import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { NextApiHandler } from 'next';
import { Google } from '@highbeam/interface';
import { Assert } from '@highbeam/utils';
import { GoogleOAuthConfig } from '../../base/config';
import { ServiceImpl } from '../../base/service';
import { IGoogleService } from '@highbeam/interface/build/services/google';

export class GoogleService implements ServiceImpl<IGoogleService> {
  private oauth2Client: OAuth2Client;

  constructor(
    private readonly config: GoogleOAuthConfig,
    private readonly scopes: readonly string[]
  ) {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUrl,
    });
  }

  oauth: NextApiHandler = async (req, res) => {
    const redirectUrl = req.query.redirectUrl;

    if (typeof redirectUrl !== 'string') {
      throw new Error('expected a string redirect url');
    }

    const installUrl = this.oauth2Client.generateAuthUrl({
      // show consent prompt with offline access to receive refresh token
      prompt: 'consent',
      access_type: 'offline',
      redirect_uri: redirectUrl,
      scope: [...this.scopes, 'profile', 'email'],
    });

    return res.redirect(installUrl);
  };

  exchangeCode: NextApiHandler<Google.ExchangeCodeResponse> = async (
    req,
    res
  ) => {
    const code = req.body.code;
    const oauthResponse = await this.oauth2Client.getToken(code);

    const idToken = Assert.exists(
      oauthResponse.tokens.id_token,
      'expected id token to exist'
    );
    const idTicket = await this.oauth2Client.verifyIdToken({
      idToken,
      audience: this.config.clientId,
    });
    const profile = idTicket.getPayload();

    const accessToken = Assert.exists(
      oauthResponse.tokens.access_token,
      'expected access token to exist'
    );
    const refreshToken = Assert.exists(
      oauthResponse.tokens.refresh_token,
      'expected refresh token to exist'
    );
    const expiresAt = Assert.exists(
      oauthResponse.tokens.expiry_date,
      'expected token expiry date to exist'
    );
    const email = Assert.exists(profile?.email, 'expected email to exist');
    const name = Assert.exists(profile?.name, 'expected name to exist');

    return res.json({
      accessToken,
      refreshToken,
      expiresAt,
      email,
      name,
    });
  };

  refreshToken: NextApiHandler<Google.RefreshTokenResponse> = async (
    req,
    res
  ) => {
    const refreshToken: string = req.body.refreshToken;
    const client = new google.auth.OAuth2({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      redirectUri: this.config.redirectUrl,
    });
    client.setCredentials({
      refresh_token: refreshToken,
    });
    const refreshResponse = await client.refreshAccessToken();

    const accessToken = Assert.exists(
      refreshResponse.credentials.access_token,
      'expected access token to exist'
    );
    const newRefreshToken =
      refreshResponse.credentials.refresh_token || refreshToken;
    const expiresAt = Assert.exists(
      refreshResponse.credentials.expiry_date,
      'expected token expiry date to exist'
    );
    return res.json({
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
    });
  };
}
