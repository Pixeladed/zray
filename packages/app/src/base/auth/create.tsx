import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0Config } from '../../web/base/config';
import { Routes } from '../../routes';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthGate } from './auth_gate';
import { Button } from '@highbeam/components';

export const createAuth = ({ config }: { config: Auth0Config }) => {
  const redirectUrl = new URL(window.location.origin);
  redirectUrl.hash = Routes.loginCallback().absolute;
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
    />
  );

  const login = () => authClient.loginWithRedirect();
  const LoginButton = () => (
    <Button variant="primary" onClick={login}>
      Login
    </Button>
  );

  const AuthGateImpl = ({ children }: React.PropsWithChildren) => (
    <AuthGate LoginButton={LoginButton}>{children}</AuthGate>
  );

  return {
    AuthProvider,
    authClient,
    AuthGate: AuthGateImpl,
  };
};
