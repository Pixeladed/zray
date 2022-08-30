import { createRemoteJWKSet, jwtVerify } from 'jose';
import {
  FlattenedJWSInput,
  GetKeyFunction,
  JWSHeaderParameters,
} from 'jose/dist/types/types';

export class AuthService {
  private jwks: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

  constructor(
    private readonly auth0Domain: string,
    private readonly auth0Audience: string
  ) {
    this.jwks = createRemoteJWKSet(
      new URL(`https://${this.auth0Domain}/.well-known/jwks.json`)
    );
  }

  verify = async (token: string) => {
    const { payload } = await jwtVerify(token, this.jwks, {
      audience: this.auth0Audience,
    });

    return payload;
  };
}
