import { TappableArea } from '@highbeam/components';
import { ComponentType } from 'react';
import { IntegrationInfo } from '../../../../interface/intergration';
import {
  FileSearchResult,
  MessageSearchResult,
  SearchResult,
} from '../../../../interface/search';
import styles from './search_result_card.module.css';

export const SearchResultCard = ({
  result,
  integration,
  onClick,
}: {
  result: SearchResult;
  integration: IntegrationInfo;
  onClick: () => void;
}) => {
  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        <img
          className={styles.icon}
          alt={integration.name}
          src={integration.icon}
        />
        <div>
          {result.type === 'file' && <FileResult result={result} />}
          {result.type === 'message' && <MessageResult result={result} />}
        </div>
      </div>
    </TappableArea>
  );
};

type ResultComponent<T extends SearchResult> = ComponentType<{ result: T }>;

const FileResult: ResultComponent<FileSearchResult> = ({ result }) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.title}</h3>
      <p className={styles.resultCardDescription}>
        <span className={styles.type}>{result.type}</span> &middot;{' '}
        {result.fileType}
      </p>
    </div>
  );
};

const MessageResult: ResultComponent<MessageSearchResult> = ({ result }) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.text}</h3>
      <p className={styles.resultCardDescription}>
        <span className={styles.type}>{result.type}</span> &middot; in{' '}
        {result.channel} by {result.author.name}
      </p>
    </div>
  );
};
