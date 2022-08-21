import { InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import { NextApiHandler } from 'next';
import { Config } from '../../base/config';

export class SlackService {
  private installProvider: InstallProvider;

  constructor(private readonly config: Config['slack']) {
    this.installProvider = new InstallProvider({
      clientId: config.clientId,
      clientSecret: config.clientId,
    });
  }

  authorize: NextApiHandler = async (req, res) => {
    const redirectUrl = req.query.redirectUrl;

    if (typeof redirectUrl !== 'string') {
      throw new Error('expected a string redirect url');
    }

    const installUrl = await this.installProvider.generateInstallUrl({
      scopes: [],
      userScopes: ['search:read'],
      redirectUri: redirectUrl,
    });

    return res.redirect(installUrl);
  };

  exchangeToken: NextApiHandler = async (req, res) => {
    const code = req.body.code;
    const client = new WebClient();
    const oauthResponse = await client.oauth.access({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
    });

    if (oauthResponse.ok) {
      return res.json({ accessToken: oauthResponse.access_token! });
    } else {
      throw new Error('Unable to authorize Slack');
    }
  };
}
