import { SlackNativeIntegration } from '../slack/slack_native_integration';
import {
  IntegrationNativeService,
  NativeIntegration,
} from './integration_native_service';

const integrationInfos = [new SlackNativeIntegration()];
export const createIntegrationNativeService = (
  integrations: readonly NativeIntegration[]
) => {
  const integrationNativeService = new IntegrationNativeService(
    integrationInfos,
    integrations
  );

  return { integrationNativeService };
};
