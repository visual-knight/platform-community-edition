import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver]
    }).compile();
    resolver = module.get<PaymentResolver>(PaymentResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
