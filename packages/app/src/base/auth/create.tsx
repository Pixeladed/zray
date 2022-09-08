import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0Config } from '../../web/base/config';
import { Routes } from '../../routes';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthGate } from './auth_gate';
import { Button } from '@highbeam/components';

export const createAuth = ({
  config,
  redirectOrigin,
}: {
  config: Auth0Config;
  redirectOrigin: string;
}) => {
  const redirectUrl = new URL(redirectOrigin);
  redirectUrl.pathname = Routes.loginCallback().absolute;
  const authClient = new Auth0Client({
    client_id: config.clientId,
    domain: config.domain,
    audience: config.audience,
    redirect_uri: redirectUrl.toString(),
  });

  const AuthProvider = ({ children }: React.PropsWithChildren) => (
    <Auth0Provider
      clientId={config.clientId}
      domain={config.domain}
      audience={config.audience}
      redirectUri={redirectUrl.toString()}
      children={children}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    />
  );

  const login = () => {
    authClient.loginWithRedirect();
  };
  const LoginButton = () => <Button onClick={login}>Login</Button>;

  const AuthGateImpl = ({ children }: React.PropsWithChildren) => (
    <AuthGate LoginButton={LoginButton}>{children}</AuthGate>
  );

  const handleCallback = async (url: string) => {
    const creds = await authClient.handleRedirectCallback(url);
    console.log('authenticated', creds);
    console.log('token?', await authClient.getUser());
    console.log('token?', await authClient.getTokenSilently());
    window.location.reload();
  };

  return {
    AuthProvider,
    authClient,
    AuthGate: AuthGateImpl,
    handleCallback,
  };
};
