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
  componentMap,
  onClick,
}: ResultProps & {
  componentMap: { [key in SearchResult['type']]: ResultComponent<any> };
}) => {
  const Renderer = componentMap[result.type];

  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        {!!result.icon ? (
          <div className={styles.combinedIcon}>
            <img className={styles.icon} alt={result.type} src={result.icon} />
            <img
              className={styles.combinedIconIntegration}
              alt={integration.name}
              src={integration.icon}
            />
          </div>
        ) : (
          <img
            className={styles.icon}
            alt={`${integration.name} ${result.type}`}
            src={integration.icon}
          />
        )}
        <Renderer integration={integration} result={result} />
      </div>
    </TappableArea>
  );
};
