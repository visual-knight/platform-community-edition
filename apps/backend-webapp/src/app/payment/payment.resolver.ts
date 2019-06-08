import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { SendPaymentInput } from './dto/send-payment.input';
import { User as PrismaUser } from '../../generated/prisma-client';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Mutation(returns => Boolean)
  async sendPayment(
    @Args('data') sendPaymentData: SendPaymentInput,
    @CurrentUser() user: PrismaUser
  ): Promise<boolean> {
    return this.paymentService.createPayment(user, sendPaymentData);
  }
}
