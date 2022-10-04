import { TappableArea } from '@highbeam/components';
import { ComponentType } from 'react';
import { IntegrationInfo } from '../../../../interface/intergration';
import { SearchResult } from '../../../../interface/search';
import styles from './search_result_card.module.css';

export type ResultComponent<T extends SearchResult> = ComponentType<{
  result: T;
  integration: IntegrationInfo;
}>;

export type ResultProps = {
  result: SearchResult;
  integration: IntegrationInfo;
  onClick: () => void;
};

export const SearchResultCard = ({
  result,
  integration,
  onClick,
}: ResultProps) => {
  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        <img
          className={styles.icon}
          alt={`${integration.name} search result`}
          src={integration.icon}
        />

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
            {result.preview}
          </p>
        </div>
      </div>
    </TappableArea>
  );
};
