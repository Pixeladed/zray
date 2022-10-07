import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';
import { Stripe } from 'stripe';
import { AuthService } from '../auth/auth_service';

export class UsageService {
  stripe: Stripe;

  constructor(
    private readonly authService: AuthService,
    readonly stripeApiKey: string
  ) {
    this.stripe = new Stripe(stripeApiKey, { apiVersion: '2022-08-01' });
  }

  getCurrentPlan: NextApiHandler<Usage.GetCurrentPlanResponse> = async (
    req,
    res
  ) => {
    const userId = await this.authService.userIdFromHeader(req.headers);
    const customer = await this.getOrCreateStripeCustomer(userId);
    return res.json({ plan: 'free' });
  };

  private getOrCreateStripeCustomer = async (userId: string) => {
    const existing = await this.stripe.customers.search({
      query: `metadata["auth0Id"]:"${userId}"`,
    });

    if (existing.data.length > 1) {
      throw new Error('Found 2 customers with the same user id');
    }

    if (existing.data.length === 1) {
      return existing.data[0];
    }

    const customer = await this.stripe.customers.create({
      metadata: {
        auth0Id: userId,
      },
    });

    return customer;
  };
}
