import { Button } from '@highbeam/components';
import { useEffect } from 'react';
import {
  IntegrationInfo,
  IntegrationProfile,
} from '../../../interface/intergration';
import styles from './search.module.css';

export function SearchPage({
  onConnectTool,
  init,
  integrations,
  profiles,
}: {
  onConnectTool: () => void;
  init: () => void;
  integrations: readonly IntegrationInfo[];
  profiles: readonly IntegrationProfile[];
}) {
  useEffect(init, [init]);

  return (
    <div className={styles.page}>
      <input placeholder="What are you looking for?" className={styles.input} />
      {!!profiles.length ? (
        <div className={styles.profilesContainer}>
          <p>
            Searching {profiles.length} connected tools{' '}
            <Button onClick={onConnectTool}>Add another</Button>
          </p>
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyLead}>
            Looks like you don&apos;t have any tools connected
          </p>
          <Button onClick={onConnectTool}>Connect a tool</Button>
        </div>
      )}
    </div>
  );
}
