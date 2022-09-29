import { ComponentType, PropsWithChildren } from 'react';
import styles from './auth_gate.module.css';

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
    return <div className={styles.container}>Loading...</div>;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <LoginButton />
    </div>
  );
};
