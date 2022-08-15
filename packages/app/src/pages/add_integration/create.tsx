import { IntegrationService } from '../../services/integration/integration_service';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = ({
  integrationService,
}: {
  integrationService: IntegrationService;
}) => {
  const integrations = integrationService.findIntegrations();
  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
