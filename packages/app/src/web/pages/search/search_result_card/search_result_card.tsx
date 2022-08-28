import { TappableArea } from '@highbeam/components';
import { ComponentType } from 'react';
import { IntegrationInfo } from '../../../../interface/intergration';
import {
  FileSearchResult,
  MessageSearchResult,
  SearchResult,
} from '../../../../interface/search';
import styles from './search_result_card.module.css';

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

type ResultComponent<T extends SearchResult> = ComponentType<{
  result: T;
  integration: IntegrationInfo;
}>;
const componentMap: { [key in SearchResult['type']]: ResultComponent<any> } = {
  file: FileResult,
  message: MessageResult,
};

export const SearchResultCard = ({
  result,
  integration,
  onClick,
}: {
  result: SearchResult;
  integration: IntegrationInfo;
  onClick: () => void;
}) => {
  const Renderer = componentMap[result.type];

  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        <img
          className={styles.icon}
          alt={`${integration.name} ${result.type}`}
          src={result.icon || integration.icon}
        />
        <Renderer integration={integration} result={result} />
      </div>
    </TappableArea>
  );
};
