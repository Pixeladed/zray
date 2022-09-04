import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';
import { Auth0Config } from '../config';
import { Routes } from '../../routes';
import { Button } from '@highbeam/components';

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

  const LoginButton = () => {
    const auth0 = useAuth0();
    return (
      <Button variant="primary" onClick={auth0.loginWithRedirect}>
        Login
      </Button>
    );
  };

  const LogoutButton = () => {
    const auth0 = useAuth0();
    return <Button onClick={auth0.logout}>Logout</Button>;
  };

  const AuthGate = ({ children }: PropsWithChildren) => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
      }
    }, [isAuthenticated, isLoading, loginWithRedirect]);

    return <>{children}</>;
  };

  return {
    AuthProvider,
    LoginButton,
    LogoutButton,
    AuthGate,
  };
};
