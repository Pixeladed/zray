import { useEffect } from 'react';
import { TappableArea } from '@highbeam/components';
import { IntegrationInfo } from '../../../../../interface/intergration';
import styles from './add_integration.module.css';

export const AddIntegrationPage = ({
  init,
  integrations,
  onConnect,
}: {
  init: () => void;
  integrations: readonly IntegrationInfo[];
  onConnect: (id: string) => void;
}) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
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