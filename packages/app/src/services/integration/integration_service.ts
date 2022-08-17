import { Integration } from './integration';

export class IntegrationService {
  constructor(private readonly integrations: Integration[]) {}

  // this could be dynamic in the future
  findIntegrations = () => {
    return this.integrations;
  };
}
