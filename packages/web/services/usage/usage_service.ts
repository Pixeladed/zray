import { NextApiHandler } from 'next';
import { Usage } from '@highbeam/interface';
import { Stripe } from 'stripe';
import { AuthService } from '../auth/auth_service';

const STRIPE_METADATA_INTEGRATION_LIMIT_FIELD = 'integration_limit';
const STRIPE_METADATA_INTEGRATION_LIMIT_UNLIMITED = -1;
const STRIPE_METADATA_AUTH0_USER_ID_FIELD = 'auth0_user_id';

export class UsageService {
  stripe: Stripe;

  constructor(
    private readonly authService: AuthService,
    stripeApiKey: string,
    private readonly defaultPriceId: string
  ) {
    this.stripe = new Stripe(stripeApiKey, { apiVersion: '2022-08-01' });
  }

  getCurrentPlan: NextApiHandler<Usage.GetCurrentPlanResponse> = async (
    req,
    res
  ) => {
    const userId = await this.authService.userIdFromHeader(req.headers);

    // The following steps are also done in Auth0 actions
    const customer = await this.getOrCreateStripeCustomer(userId);
    const product = await this.getOrCreateSubscribedProduct(customer);

    const integrationLimit = this.getIntegrationLimit(product);

    return res.json({
      name: product.name,
      integrationLimit,
    });
  };

  private getOrCreateStripeCustomer = async (userId: string) => {
    const existing = await this.stripe.customers.search({
      query: `metadata["${STRIPE_METADATA_AUTH0_USER_ID_FIELD}"]:"${userId}"`,
      expand: ['data.subscriptions'],
    });

    if (existing.data.length > 1) {
      throw new Error('Found 2 customers with the same user id');
    }

    if (existing.data.length === 1) {
      return existing.data[0];
    }

    const customer = await this.stripe.customers.create({
      metadata: {
        [STRIPE_METADATA_AUTH0_USER_ID_FIELD]: userId,
      },
    });

    return customer;
  };

  private getOrCreateSubscribedProduct = async (customer: Stripe.Customer) => {
    let subscriptions = customer.subscriptions?.data || [];
    if (!subscriptions.length) {
      // customer has no subscription, automatically subscribe them to the free plan
      const record = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: this.defaultPriceId,
          },
        ],
      });
      subscriptions = [record];
    }

    const productIds = subscriptions.flatMap(subscription =>
      subscription.items.data.map(item => item.plan.product as string)
    );

    if (productIds.length > 1) {
      throw new Error('Customer is subscribed to multiple products');
    }

    const product = await this.stripe.products.retrieve(productIds[0]);

    return product;
  };

  private getIntegrationLimit = (product: Stripe.Product) => {
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

    return integrationLimit;
  };
}
