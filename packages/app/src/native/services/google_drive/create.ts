import { GoogleDriveNativeService } from './google_drive_native_service';

export const createGoogleDriveNativeService = () => {
  const googleDriveNativeService = new GoogleDriveNativeService();

  return { googleDriveNativeService };
};
