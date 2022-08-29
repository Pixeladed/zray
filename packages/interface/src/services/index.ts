import { IGoogleDriveService } from './google_drive';
import { ISlackService } from './slack';
export * as Slack from './slack';
export * as GoogleDrive from './google_drive';

export type Services = 'slack' | 'googleDrive';
export type IServices = ISlackService | IGoogleDriveService;
export type IServiceMap = {
  slack: ISlackService;
  googleDrive: IGoogleDriveService;
};
