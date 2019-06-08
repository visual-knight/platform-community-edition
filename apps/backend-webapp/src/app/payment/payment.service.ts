import { Injectable } from '@nestjs/common';
import { User } from '../../generated/prisma-client';
import { PrismaService } from '../shared/prisma/prisma.service';
import { gql } from 'apollo-server-core';
import { StripeService } from '../shared/stripe/stripe.service';
import { SendPaymentInput } from './dto/send-payment.input';
import { AwsService } from '../shared/aws';
import { ProductService } from '../shared/product/product.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
    private awsService: AwsService,
    private productservice: ProductService
  ) {}

  async createPayment(
    user: User,
    { planId, token, company, business_vat_id }: SendPaymentInput
  ): Promise<boolean> {
    const userFragmentData = await this.prisma.client
      .user({ id: user.id })
      .$fragment<{
        stripeCustomerId: string;
        email: string;
        contractUser: {
          id: string;
          planStripeId: string;
          contractUserAwsConfig: {
            apiKeyId: string;
          };
        };
      }>(
        gql`
          {
            stripeCustomerId
            email
            contractUser {
              id
              planStripeId
              contractUserAwsConfig {
                apiKeyId
              }
            }
          }
        `
      );

    let stripeCustomerId = userFragmentData.stripeCustomerId;
    const oldStripePlanId = userFragmentData.contractUser.planStripeId;
    const apiKeyId =
      userFragmentData.contractUser.contractUserAwsConfig.apiKeyId;

    if (stripeCustomerId) {
      const subscriptions = await this.stripeService.subscriptions.list({
        customer: stripeCustomerId
      });
      const subscription = subscriptions.data.find(
        sub => sub.customer === stripeCustomerId
      );
      if (!subscription) {
        console.log(
          `Error no subscription found for customer: ${stripeCustomerId}`
        );
        throw new Error('No subscription found for customer');
      }
      const subscriptionData = await this.stripeService.subscriptions.retrieve(
        subscription.id
      );
      await this.stripeService.subscriptions.update(subscription.id, {
        cancel_at_period_end: false,
        items: [
          {
            id: subscriptionData.items.data[0].id,
            plan: planId
          }
        ]
      });
      try {
        const invoice = await this.stripeService.invoices.create({
          customer: stripeCustomerId,
          billing: 'charge_automatically'
        });
        await this.stripeService.invoices.pay(invoice.id);
      } catch (error) {
        console.log(stripeCustomerId);
        console.log(error);
      }
    } else {
      // create a customer and subscribe to plan
      const customer = await this.stripeService.customers.create({
        email: user.email,
        source: token.id,
        metadata: {
          business_vat_id: business_vat_id
        },
        description: company,
        shipping: {
          address: {
            city: token.card.address_city,
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            postal_code: token.card.address_zip,
            country: token.card.country,
            state: token.card.address_state
          },
          name: token.card.name
        }
      });
      stripeCustomerId = customer.id;
      await this.prisma.client.updateUser({
        data: { stripeCustomerId },
        where: { id: user.id }
      });

      const subscription = await this.stripeService.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ plan: planId }]
      });
    }

    await this.prisma.client.updateContractUser({
      data: { planStripeId: planId },
      where: {
        id: userFragmentData.contractUser.id
      }
    });

    await this.awsService.updateAwsUsagePlan(
      this.productservice.findProductByPlanId(oldStripePlanId),
      this.productservice.findProductByPlanId(planId),
      apiKeyId
    );

    return true;
  }
}
