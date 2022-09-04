import { Auth0Provider } from '@auth0/auth0-react';
import React, { PropsWithChildren } from 'react';
import { Auth0Config } from '../../../base/config';
import { Routes } from '../../../routes';

export const createAuth = ({
  config,
  redirectOrigin,
}: {
  config: Auth0Config;
  redirectOrigin: string;
}) => {
  const redirectUrl = new URL(redirectOrigin);
  redirectUrl.hash = Routes.loginCallback().absolute;
  const AuthProvider = ({ children }: PropsWithChildren) => (
    <Auth0Provider
      clientId={config.clientId}
      domain={config.domain}
      audience={config.audience}
      redirectUri={redirectUrl.toString()}
      children={children}
    />
  );

  return {
    AuthProvider,
  };
};
