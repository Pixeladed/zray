import { config } from '../../../base/config';
import { createGoogleDriveService } from '../../../services/google_drive/create';

const { googleDriveService } = createGoogleDriveService(config.google);

export default googleDriveService.exchangeCode;
