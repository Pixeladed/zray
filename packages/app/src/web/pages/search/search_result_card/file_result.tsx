import { FileSearchResult } from '../../../../interface/search';
import { ResultComponent } from './search_result_card';
import styles from './search_result_card.module.css';

export const FileResult: ResultComponent<FileSearchResult> = ({
  result,
  integration,
}) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.title}</h3>
      <p className={styles.resultCardDescription}>
        {integration.name} &middot;{' '}
        <span className={styles.type}>{result.type}</span> &middot;{' '}
        {result.fileType}
      </p>
    </div>
  );
};
