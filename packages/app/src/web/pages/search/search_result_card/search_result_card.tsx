import { TappableArea } from '@highbeam/components';
import { ComponentType } from 'react';
import { SearchResult } from '../../../../interface/search';
import styles from './search_result_card.module.css';

export const SearchResultCard = ({
  result,
  onClick,
}: {
  result: SearchResult;
  onClick: () => void;
}) => {
  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        {result.type === 'file' && <FileResult result={result} />}
        {result.type === 'message' && <MessageResult result={result} />}
      </div>
    </TappableArea>
  );
};

type ResultComponent = ComponentType<{ result: SearchResult }>;

const FileResult: ResultComponent = ({ result }) => {
  return <div></div>;
};

const MessageResult: ResultComponent = ({ result }) => {
  return <div></div>;
};
