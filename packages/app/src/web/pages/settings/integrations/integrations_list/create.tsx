import { BridgeClient } from '../../../../base/bridge_client';
import { IntegrationsListPage } from './integrations_list';

export const createIntegrationsListPage = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const IntegrationsListPageImpl = () => <IntegrationsListPage />;

  return { IntegrationsListPage: IntegrationsListPageImpl };
};
