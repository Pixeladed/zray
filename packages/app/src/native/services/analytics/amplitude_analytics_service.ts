import * as Amplitude from '@amplitude/analytics-node';
import { machineIdSync } from 'node-machine-id';
import { AnalyticsTrackEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { AnalyticsNativeService } from './analytics_native_service';

export class AmplitudeAnalyticsService implements AnalyticsNativeService {
  private userId: string | undefined = undefined;
  private deviceId: string | undefined = undefined;

  constructor(
    amplitudeApiKey: string,
    private readonly version: string,
    private readonly platform: string
  ) {
    Amplitude.init(amplitudeApiKey);
    this.deviceId = machineIdSync();
  }

  track: Handler<AnalyticsTrackEndpoint> = async ({ data }) => {
    const props = {
      ...data.properties,
      version: this.version,
      platform: this.platform,
    };
    Amplitude.track(data.name, props, {
      device_id: this.deviceId,
      user_id: this.userId,
    });
    return {};
  };

  identify = (id: string | undefined) => {
    this.userId = id;
    const identifier = new Amplitude.Identify();
    Amplitude.identify(identifier, {
      user_id: id,
      device_id: this.deviceId,
      platform: this.platform,
      app_version: this.version,
    });
  };
}
