import { config } from '../../../base/config';
import { createGoogleDriveService } from '../../../services/google_drive/create';

const { googleDriveService } = createGoogleDriveService(config.googleDrive);

export default googleDriveService.exchangeCode;
