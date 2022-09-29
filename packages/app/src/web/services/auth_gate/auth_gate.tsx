import { ComponentType, PropsWithChildren } from 'react';

export const AuthGate = ({
  isLoggedIn,
  loading,
  children,
  LoginButton,
}: PropsWithChildren<{
  isLoggedIn: boolean;
  loading: boolean;
  LoginButton: ComponentType;
}>) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div>
      <LoginButton />
    </div>
  );
};
