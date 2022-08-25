import { Button, TappableArea } from '@highbeam/components';
import { useEffect, useState, ChangeEvent, useMemo } from 'react';
import {
  IntegrationInfo,
  IntegrationProfile,
} from '../../../interface/intergration';
import { useDebouncedCallback } from 'use-debounce';
import styles from './search.module.css';
import { SearchResult } from '../../../interface/search';
import { SearchResultCard } from './search_result_card/search_result_card';

export function SearchPage({
  onConnectTool,
  init,
  openResult,
  loading,
  onSearch,
  results,
  integrations,
  profiles,
}: {
  onConnectTool: () => void;
  init: () => void;
  openResult: (result: SearchResult) => void;
  loading: boolean;
  onSearch: (query: string) => void;
  integrations: readonly IntegrationInfo[];
  profiles: readonly IntegrationProfile[];
  results: readonly SearchResult[];
}) {
  useEffect(() => {
    init();
  }, [init]);

  const [value, setValue] = useState('');
  const triggerSearch = useDebouncedCallback(onSearch, 500);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    triggerSearch(val);
  };
  const integrationsById = useMemo(
    () =>
      integrations.reduce((map, integration) => {
        map.set(integration.id, integration);
        return map;
      }, new Map<string, IntegrationInfo>()),
    [integrations]
  );

  return (
    <div className={styles.page}>
      {!!profiles.length && (
        <div className={styles.profilesContainer}>
          <p>
            Searching {profiles.length} connected tools.{' '}
            <TappableArea onClick={onConnectTool}>
              <span className={styles.addMore}>Add another</span>
            </TappableArea>
          </p>
        </div>
      )}
      <input
        placeholder="What are you looking for?"
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
      {!profiles.length && (
        <div className={styles.empty}>
          <p className={styles.emptyLead}>
            Looks like you don&apos;t have any tools connected
          </p>
          <Button onClick={onConnectTool}>Connect a tool</Button>
        </div>
      )}
      {results.map(result => (
        <SearchResultCard
          onClick={() => openResult(result)}
          key={result.id}
          integration={integrationsById.get(result.integrationId)!}
          result={result}
        />
      ))}
      {loading && <>Loading...</>}
    </div>
  );
}
