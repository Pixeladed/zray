import { useAuth0 } from '@auth0/auth0-react';
import React, { ComponentType } from 'react';
import styles from './auth_gate.module.css';

export const AuthGate = ({
  children,
  LoginButton,
}: React.PropsWithChildren<{ LoginButton: ComponentType }>) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
};
