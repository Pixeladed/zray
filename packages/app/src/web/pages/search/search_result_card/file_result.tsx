import { FileSearchResult } from '../../../../interface/search';
import { ResultComponent } from './search_result_card';
import styles from './search_result_card.module.css';

export const FileResult: ResultComponent<FileSearchResult> = ({ result }) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.title}</h3>
      <p className={styles.resultCardDescription}>
        {!!result.icon && (
          <img
            src={result.icon}
            className={styles.inlineIcon}
            alt={result.title}
          />
        )}{' '}
        <span className={styles.type}>{result.type}</span>&nbsp;&middot;{' '}
        {result.fileType}
      </p>
    </div>
  );
};
