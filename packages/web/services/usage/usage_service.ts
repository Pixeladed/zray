import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';
import { Stripe } from 'stripe';
import { AuthService } from '../auth/auth_service';

const STRIPE_METADATA_INTEGRATION_LIMIT_FIELD = 'integration_limit';
const STRIPE_METADATA_INTEGRATION_LIMIT_UNLIMITED = -1;

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

    if (!customer.subscriptions) {
      throw new Error('Customer does not have any subscription');
    }

    const products = customer.subscriptions.data.flatMap(subscription =>
      subscription.items.data.map(item => item.plan.product as Stripe.Product)
    );

    if (products.length > 1) {
      throw new Error('Customer is subscribed to multiple products');
    }

    const product = products[0];
    const recordedLimit = parseInt(
      product.metadata[STRIPE_METADATA_INTEGRATION_LIMIT_FIELD]
    );

    if (Number.isNaN(recordedLimit)) {
      throw new Error('Product integration limit is not a number');
    }

    const integrationLimit =
      recordedLimit === STRIPE_METADATA_INTEGRATION_LIMIT_UNLIMITED
        ? null
        : recordedLimit;

    return res.json({
      name: product.name,
      integrationLimit,
    });
  };

  private getOrCreateStripeCustomer = async (userId: string) => {
    const existing = await this.stripe.customers.search({
      query: `metadata["auth0Id"]:"${userId}"`,
      expand: ['subscriptions.items.plan.product'],
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
