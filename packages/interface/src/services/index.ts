import { ISlackService } from './slack';
export * from './slack';

export type Services = 'slack';
export type IServices = ISlackService;
export type IServiceMap = {
  slack: ISlackService;
};
