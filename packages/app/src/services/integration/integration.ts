import { MintedPath } from '../../base/path';
import { OperationResult, Provider } from './provider';

/**
 * An integration is a type of connector that can be configured to create a new provider
 * an integration itself cannot provide searching capabilities
 */
export abstract class Integration implements IntegrationInfo {
  constructor(readonly name: string, readonly icon: MintedPath) {}

  abstract connect(): Promise<OperationResult<Provider>>;
}

export type IntegrationInfo = {
  name: string;
  icon: MintedPath;
};
