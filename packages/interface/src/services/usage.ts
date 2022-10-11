import { IClient } from '../client';
import { Endpoint } from './base';

export type GetCurrentPlanRequest = {};
export type GetCurrentPlanResponse = {
  name: string;
  integrationLimit: number | null;
};

export interface IUsageService {
  getCurrentPlan: Endpoint<GetCurrentPlanRequest, GetCurrentPlanResponse>;
}

export type UsageClient = IClient<IUsageService>;
