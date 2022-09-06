import { Auth0Provider } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';
import { Auth0Config } from '../../web/base/config';
import { Routes } from '../../routes';
import { Auth0Client } from '@auth0/auth0-spa-js';

export const createAuth = ({
  config,
  redirectOrigin,
}: {
  config: Auth0Config;
  redirectOrigin: string;
}) => {
  const redirectUrl = new URL(redirectOrigin);
  redirectUrl.hash = Routes.loginCallback().absolute;
  const authClient = new Auth0Client({
    client_id: config.clientId,
    domain: config.domain,
    audience: config.audience,
    redirect_uri: redirectUrl.toString(),
  });

  const AuthProvider = ({ children }: PropsWithChildren) => (
    <Auth0Provider
      clientId={config.clientId}
      domain={config.domain}
      audience={config.audience}
      redirectUri={redirectUrl.toString()}
      children={children}
    />
  );

  const AuthGate = ({ children }: PropsWithChildren) => {
    // const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    // useEffect(() => {
    //   if (!isLoading && !isAuthenticated) {
    //     loginWithRedirect();
    //   }
    // }, [isAuthenticated, isLoading, loginWithRedirect]);

    return <>{children}</>;
  };

  return {
    AuthProvider,
    authClient,
    AuthGate,
  };
};
