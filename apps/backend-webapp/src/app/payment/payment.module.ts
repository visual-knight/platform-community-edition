import { Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
  imports: [],
  providers: [PaymentResolver, PaymentService],
  exports: []
})
export class PaymentModule {}
