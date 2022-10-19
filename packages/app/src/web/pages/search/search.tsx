import { Button, TappableArea } from '@highbeam/components';
import { useState, ChangeEvent, ComponentType, useEffect } from 'react';
import {
  IntegrationInfo,
  IntegrationProfile,
} from '../../../interface/intergration';
import { useDebouncedCallback } from 'use-debounce';
import styles from './search.module.css';
import { SearchResult } from '../../../interface/search';
import { ResultProps } from './search_result_card/search_result_card';
import { Settings as CogIcon } from 'react-feather';

export function SearchPage({
  onConnectTool,
  onOpenSettings,
  openResult,
  loading,
  onSearch,
  results,
  integrationById,
  profiles,
  ResultCard,
}: {
  onConnectTool: () => void;
  onOpenSettings: () => void;
  openResult: (result: SearchResult) => void;
  loading: boolean;
  onSearch: (query: string) => void;
  integrationById: Map<string, IntegrationInfo>;
  profiles: readonly IntegrationProfile[];
  results: readonly SearchResult[];
  ResultCard: ComponentType<ResultProps>;
}) {
  const [value, setValue] = useState('');
  const triggerSearch = useDebouncedCallback(onSearch, 500);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    triggerSearch(val);
  };

  return (
    <div className={styles.page}>
      <div className={styles.sticky}>
        <div className={styles.titleBar} />
        {!!profiles.length && (
          <div className={styles.profilesContainer}>
            <p className={styles.profilesDescription}>
              Searching {profiles.length} connected tools.{' '}
              <TappableArea onClick={onConnectTool}>
                <span className={styles.addMore}>Add another</span>
              </TappableArea>
            </p>
            <TappableArea onClick={onOpenSettings}>
              <CogIcon size="1em" color="#777" />
            </TappableArea>
          </div>
        )}
        <input
          placeholder="What are you looking for?"
          className={styles.input}
          value={value}
          onChange={handleChange}
          autoFocus={true}
        />
      </div>
      {!profiles.length && (
        <div className={styles.empty}>
          <p className={styles.emptyLead}>
            Looks like you don&apos;t have any tools connected
          </p>
          <Button variant="primary" onClick={onConnectTool}>
            Connect a tool
          </Button>
        </div>
      )}
      {loading && (
        <div className={styles.loading}>
          Searching {profiles.length} tools...
        </div>
      )}
      {results.map(result => (
        <ResultCard
          onClick={() => openResult(result)}
          key={result.id}
          integration={integrationById.get(result.integrationId)!}
          result={result}
        />
      ))}
    </div>
  );
}
