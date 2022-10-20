import Amplitude from '@amplitude/analytics-node';
import { AnalyticsTrackEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { AnalyticsNativeService } from './analytics_native_service';

export class AmplitudeAnalyticsService implements AnalyticsNativeService {
  constructor(
    amplitudeApiKey: string,
    private readonly version: string,
    private readonly platform: string
  ) {
    Amplitude.init(amplitudeApiKey);
  }

  track: Handler<AnalyticsTrackEndpoint> = async ({ data }) => {
    const props = {
      ...data.properties,
      version: this.version,
      platform: this.platform,
    };
    Amplitude.track(data.name, props);
    return {};
  };

  identify = (id: string) => {
    const identifier = new Amplitude.Identify();
    Amplitude.identify(identifier, {
      user_id: id,
    });
  };
}
