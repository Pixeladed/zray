import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';
import { AuthService } from '../auth/auth_service';

export class UsageService {
  constructor(private readonly authService: AuthService) {}

  getCurrentPlan: NextApiHandler<Usage.GetCurrentPlanResponse> = async (
    req,
    res
  ) => {
    const payload = await this.authService.verifyHeaders(req.headers);

    console.log('getting current plan with payload', payload);

    return res.json({ plan: 'free' });
  };
}
