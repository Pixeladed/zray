import { IGoogleDriveService } from './google_drive';
import { ISlackService } from './slack';
export * as Slack from './slack';
export * as GoogleDrive from './google_drive';

export type IServiceMap = {
  slack: ISlackService;
  google_drive: IGoogleDriveService;
};
export type Services = keyof IServiceMap;
export type IServices = IServiceMap[keyof IServiceMap];
