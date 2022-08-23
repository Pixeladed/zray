import { TappableArea } from '@highbeam/components';
import { IntegrationInfo } from '../../../services/integrations';
import styles from './add_integration.module.css';

export const AddIntegrationPage = ({
  integrations,
  onConnect,
}: {
  integrations: readonly IntegrationInfo[];
  onConnect: (id: string) => void;
}) => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Connect a tool</h2>
      </div>
      <div className={styles.integrationList}>
        {integrations.map(integration => (
          <TappableArea
            onClick={() => onConnect(integration.id)}
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
