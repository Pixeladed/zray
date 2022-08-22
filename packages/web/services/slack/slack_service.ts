import { InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import { NextApiHandler } from 'next';
import { SlackService as SlackServiceInterface } from '@highbeam/interface';
import { Config } from '../../base/config';
import { Assert } from '../../base/assert';

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

  exchangeCode: NextApiHandler<SlackServiceInterface.AuthorizeResponse> =
    async (req, res) => {
      const code = req.body.code;
      const client = new WebClient();
      const oauthResponse = await client.oauth.v2.access({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
      });

      if (oauthResponse.ok) {
        const accessToken = Assert.exists(
          oauthResponse.authed_user?.access_token
        );
        const userId = Assert.exists(oauthResponse.authed_user?.id);
        const organisationName = Assert.exists(oauthResponse.enterprise?.name);
        const organisationId = Assert.exists(oauthResponse.enterprise?.id);

        return res.send({
          accessToken,
          userId,
          organisationName,
          organisationId,
        });
      } else {
        throw new Error('Unable to authorize Slack');
      }
    };
}
