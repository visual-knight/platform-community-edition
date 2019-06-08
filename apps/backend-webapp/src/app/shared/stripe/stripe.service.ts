import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import { environment } from '../../../environments/environment';

@Injectable()
export class StripeService extends Stripe {
  constructor() {
    super(environment.stripe.stripeSecretKey);
  }
}
