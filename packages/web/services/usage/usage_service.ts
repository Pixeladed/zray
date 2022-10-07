import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';

export class UsageService {
  getCurrentPlan: NextApiHandler<Usage.GetCurrentPlanResponse> = (req, res) => {
    return res.json({ plan: 'free' });
  };
}
