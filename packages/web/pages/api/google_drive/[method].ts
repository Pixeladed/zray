import { config } from '../../../base/config';
import { gatewayFor } from '../../../services/gateway/gateway';
import { createGoogleDriveService } from '../../../services/google_drive/create';

const { googleDriveService } = createGoogleDriveService(config.googleDrive);

export default gatewayFor(googleDriveService);
