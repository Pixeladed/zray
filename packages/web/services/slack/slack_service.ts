import { InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import { NextApiHandler } from 'next';
import { Config } from '../../base/config';
import { Assert } from '@highbeam/utils';
import { Slack } from '@highbeam/interface';

export class SlackService {
  private installProvider: InstallProvider;

  constructor(private readonly config: Config['slack']) {
    this.installProvider = new InstallProvider({
      clientId: config.clientId,
      clientSecret: config.clientId,
      stateSecret: config.stateSecret,
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

  exchangeCode: NextApiHandler<Slack.ExchangeCodeResponse> = async (
    req,
    res
  ) => {
    const code = req.body.code;
    const client = new WebClient();
    const oauthResponse = await client.oauth.v2.access({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
    });

    if (oauthResponse.ok) {
      const accessToken = Assert.exists(
        oauthResponse.authed_user?.access_token,
        'expected  access token to exist'
      );
      const userId = Assert.exists(
        oauthResponse.authed_user?.id,
        'expected user id to exist'
      );
      const teamName = Assert.exists(
        oauthResponse.team?.name,
        'expected organisation name to exist'
      );
      const teamId = Assert.exists(
        oauthResponse.team?.id,
        'expected organisation id to exist'
      );

      return res.send({
        accessToken,
        userId,
        teamName,
        teamId,
      });
    } else {
      throw new Error('Unable to authorize Slack');
    }
  };
}
