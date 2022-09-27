import { useAuth0 } from '@auth0/auth0-react';
import React, { ComponentType } from 'react';
import styles from './auth_gate.module.css';

export const AuthGate = ({
  children,
  LoginButton,
}: React.PropsWithChildren<{ LoginButton: ComponentType }>) => {
  // const { isAuthenticated, isLoading, user } = useAuth0();
  // console.table({
  //   isAuthenticated,
  //   isLoading,
  // });
  // console.log('user', user);

  // if (isLoading) {
  //   return <div className={styles.container}>Loading...</div>;
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <div className={styles.container}>
  //       <LoginButton />
  //     </div>
  //   );
  // }

  return <>{children}</>;
};
