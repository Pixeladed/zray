import { IClient } from '../client';
import { Endpoint } from './base';

export type Plan = 'free' | 'pro';
export type GetCurrentPlanRequest = {};
export type GetCurrentPlanResponse = { plan: Plan };

export interface IUsageService {
  getCurrentPlan: Endpoint<GetCurrentPlanRequest, GetCurrentPlanResponse>;
}

export type UsageClient = IClient<IUsageService>;
