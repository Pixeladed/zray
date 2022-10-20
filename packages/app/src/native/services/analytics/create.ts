import { Assert } from '@highbeam/utils';
import { AmplitudeAnalyticsService } from './amplitude_analytics_service';
import { AnalyticsNativeService } from './analytics_native_service';
import { ConsoleAnalyticsService } from './console_analytics_service';

export const createAnalyticsNativeService = ({
  isPackaged,
  amplitudeApiKey,
  version,
}: {
  isPackaged: boolean;
  amplitudeApiKey: string | undefined;
  version: string;
}) => {
  let analyticsNativeService: AnalyticsNativeService;

  if (isPackaged) {
    const key = Assert.exists(
      amplitudeApiKey,
      'amplitude api key is required for packaged app'
    );
    analyticsNativeService = new AmplitudeAnalyticsService(key, version);
  } else {
    analyticsNativeService = new ConsoleAnalyticsService();
  }
  return { analyticsNativeService };
};
