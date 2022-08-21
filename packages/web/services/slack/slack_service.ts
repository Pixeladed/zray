import { InstallProvider } from '@slack/oauth';
import { NextApiHandler } from 'next';
import { Config } from '../../base/config';

export class SlackService {
  private installProvider: InstallProvider;

  constructor(config: Config['slack']) {
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
}
