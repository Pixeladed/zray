import { AnalyticsTrackEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';

export interface AnalyticsNativeService {
  track: Handler<AnalyticsTrackEndpoint>;
}
