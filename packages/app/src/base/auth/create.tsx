import { Auth0Config } from '../../web/base/config';
import { Routes } from '../../routes';
import { AuthGate } from './auth_gate';

export const createAuth = ({
  config,
  redirectOrigin,
}: {
  config: Auth0Config;
  redirectOrigin: string;
}) => {
  const redirectUrl = new URL(redirectOrigin);
  redirectUrl.pathname = Routes.loginCallback().absolute;

  const AuthGateImpl = ({ children }: React.PropsWithChildren) => (
    <AuthGate>{children}</AuthGate>
  );

  return {
    AuthGate: AuthGateImpl,
  };
};
