import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { NextApiHandler } from 'next';
import { Config } from '../../base/config';
import { GoogleDrive } from '@highbeam/interface';
import { Assert } from '@highbeam/utils';

export class GoogleDriveService {
  private oauth2Client: OAuth2Client;

  constructor(private readonly config: Config['google']) {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });
  }

  authorize: NextApiHandler = async (req, res) => {
    const redirectUrl = req.query.redirectUrl;

    if (typeof redirectUrl !== 'string') {
      throw new Error('expected a string redirect url');
    }

    const installUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      redirect_uri: redirectUrl,
      scope: [
        'https://www.googleapis.com/auth/drive.readonly',
        'profile',
        'email',
      ],
    });

    return res.redirect(installUrl);
  };

  exchangeCode: NextApiHandler<GoogleDrive.ExchangeCodeResponse> = async (
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
}
