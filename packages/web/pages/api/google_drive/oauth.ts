import { config } from '../../../base/config';
import { createGoogleDriveService } from '../../../services/google_drive/create';

const { googleDriveService } = createGoogleDriveService(config.slack);

export default googleDriveService.authorize;
