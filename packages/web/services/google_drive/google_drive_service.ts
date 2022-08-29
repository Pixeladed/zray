import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { NextApiHandler } from 'next';
import { Config } from '../../base/config';

export class GoogleDriveService {
  private oauth2Client: OAuth2Client;

  constructor(config: Config['google']) {
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
      scope: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return res.redirect(installUrl);
  };
}
