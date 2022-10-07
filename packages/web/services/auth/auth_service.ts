import { Assert } from '@highbeam/utils';
import { IncomingHttpHeaders } from 'http';
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

  verifyHeaders = async (header: IncomingHttpHeaders) => {
    const authorization = header.authorization;
    if (!authorization) {
      throw new Error('No authorization provided');
    }

    const match = authorization.match(/^Bearer (.+)$/);
    const token = match ? match[1] : undefined;
    if (!token) {
      throw new Error('Malformed authorization');
    }

    return this.verify(token);
  };

  verify = async (token: string) => {
    const { payload } = await jwtVerify(token, this.jwks, {
      audience: this.auth0Audience,
    });

    return payload;
  };

  userIdFromHeader = async (header: IncomingHttpHeaders) => {
    const payload = await this.verifyHeaders(header);
    return Assert.exists(payload.sub, 'expect jwt payload to have a sub field');
  };
}
