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
        <SearchResultCard key={result.id} result={result} />
      ))}
      {loading && <>Loading...</>}
    </div>
  );
}

const SearchResultCard = ({ result }: { result: SearchResult }) => {
  return (
    <a
      className={styles.resultCardLink}
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.resultCard}>
        <small>
          {result.integrationId}/{result.profileId}
        </small>
        <h4 className={styles.resultCardTitle}>{result.title}</h4>
        {!!result.description && (
          <p className={styles.resultCardDescription}>{result.description}</p>
        )}
      </div>
    </a>
  );
};
