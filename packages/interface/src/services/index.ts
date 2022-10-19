import { IGmailService } from './gmail';
import { IGoogleCalendarService } from './google_calendar';
import { IGoogleDriveService } from './google_drive';
import { ISlackService } from './slack';
import { IUsageService } from './usage';

export * as Slack from './slack';
export * as GoogleDrive from './google_drive';
export * as Gmail from './gmail';
export * as Google from './google';
export * as Usage from './usage';
export * as GoogleCalendar from './google_calendar';
export * from './base';

export type IServiceMap = {
  slack: ISlackService;
  google_drive: IGoogleDriveService;
  gmail: IGmailService;
  usage: IUsageService;
  google_calendar: IGoogleCalendarService;
};
export type Services = keyof IServiceMap;
export type IServices = IServiceMap[keyof IServiceMap];
