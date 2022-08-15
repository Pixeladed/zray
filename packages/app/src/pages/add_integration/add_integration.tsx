import { Integration } from '../../services/integration/integration';

export const AddIntegrationPage = ({
  integrations,
}: {
  integrations: readonly Integration[];
}) => {
  return (
    <div>
      {integrations.map(integration => (
        <div key={integration.name}>
          <img src={integration.icon} alt={integration.name} />
          <p>{integration.name}</p>
        </div>
      ))}
    </div>
  );
};
