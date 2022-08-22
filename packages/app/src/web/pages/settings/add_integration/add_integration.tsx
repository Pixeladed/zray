import { TappableArea } from '@highbeam/components';
import { Integration } from '../../../services/integration/integration';
import styles from './add_integration.module.css';

export const AddIntegrationPage = ({
  integrations,
}: {
  integrations: readonly Integration[];
}) => {
  return (
    <div>
      <div className={styles.integrationList}>
        {integrations.map(integration => (
          <TappableArea onClick={integration.connect} key={integration.name}>
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
