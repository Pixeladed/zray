import { TappableArea } from '@highbeam/components';
import { IntegrationName } from '../../../../interface/bridge';
import { IntegrationInfo } from '../../../services/integrations';
import styles from './add_integration.module.css';

export const AddIntegrationPage = ({
  integrations,
  onConnect,
}: {
  integrations: readonly IntegrationInfo[];
  onConnect: (name: IntegrationName) => void;
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Connect a tool</h2>
      <div className={styles.integrationList}>
        {integrations.map(integration => (
          <TappableArea
            onClick={() => onConnect(integration.name)}
            key={integration.name}
          >
            <div className={styles.integration}>
              <img
                src={integration.icon}
                alt={integration.name}
                className={styles.integrationIcon}
              />
              <p className={styles.integrationLabel}>{integration.name}</p>
            </div>
          </TappableArea>
        ))}
      </div>
    </div>
  );
};
