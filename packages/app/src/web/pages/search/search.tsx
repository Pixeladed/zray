import { Button, TappableArea } from '@highbeam/components';
import { useEffect, useState, ChangeEvent } from 'react';
import { IntegrationProfile } from '../../../interface/intergration';
import { SearchResult } from '../../../native/services/search/search_native_service';
import { useDebouncedCallback } from 'use-debounce';
import styles from './search.module.css';

export function SearchPage({
  onConnectTool,
  init,
  loading,
  onSearch,
  results,
  profiles,
}: {
  onConnectTool: () => void;
  init: () => void;
  loading: boolean;
  onSearch: (query: string) => void;
  profiles: readonly IntegrationProfile[];
  results: readonly SearchResult[];
}) {
  useEffect(init, [init]);

  const [value, setValue] = useState('');
  const triggerSearch = useDebouncedCallback(onSearch, 500);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    triggerSearch(val);
  };

  return (
    <div className={styles.page}>
      <input
        placeholder="What are you looking for?"
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
      {!!profiles.length ? (
        <div className={styles.profilesContainer}>
          <p>
            Searching {profiles.length} connected tools.{' '}
            <TappableArea onClick={onConnectTool}>
              <span className={styles.addMore}>Add another</span>
            </TappableArea>
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
      {loading ? <>Loading...</> : JSON.stringify(results, null, 2)}
    </div>
  );
}
