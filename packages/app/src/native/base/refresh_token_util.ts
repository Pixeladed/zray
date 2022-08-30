export class RefreshTokenUtil {
  private refreshTokenOp?: Promise<RefreshTokenCreds> = undefined;

  constructor(
    private readonly refreshToken: (
      refreshToken: string
    ) => Promise<RefreshTokenCreds>
  ) {}

  maybeRefreshAccessToken = async (
    profile: RefreshTokenCreds
  ): Promise<RefreshTokenCreds> => {
    if (Date.now() < profile.expiresAt) {
      return profile;
    }

    if (this.refreshTokenOp) {
      return this.refreshTokenOp;
    }

    const doRefresh = async () => {
      return await this.refreshToken(profile.refreshToken);
    };

    const op = doRefresh();
    this.refreshTokenOp = op;
    return await op;
  };
}

export type RefreshTokenCreds = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
