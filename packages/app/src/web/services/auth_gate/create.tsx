import { Button } from '@highbeam/components';
import { observer } from 'mobx-react';
import { PropsWithChildren } from 'react';
import { BridgeClient } from '../../base/bridge_client';
import { AuthGate } from './auth_gate';
import { AuthGateController, AuthGateStore } from './auth_gate_controller';

export const createAuthGate = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const store = new AuthGateStore();
  const controller = new AuthGateController(store, bridgeClient);

  const LoginButton = () => (
    <Button onClick={() => controller.login()}>Login</Button>
  );

  const AuthGateImpl = observer(({ children }: PropsWithChildren) => (
    <AuthGate
      LoginButton={LoginButton}
      isLoggedIn={store.isLoggedIn}
      loading={store.loading}
      children={children}
    />
  ));

  return { AuthGate: AuthGateImpl };
};
