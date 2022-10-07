import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';
import { AuthService } from '../auth/auth_service';

export class UsageService {
  constructor(private readonly authService: AuthService) {}

  getCurrentPlan: NextApiHandler<Usage.GetCurrentPlanResponse> = async (
    req,
    res
  ) => {
    const userId = await this.authService.userIdFromHeader(req.headers);
    return res.json({ plan: 'free' });
  };
}
