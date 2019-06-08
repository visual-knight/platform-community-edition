import { Test, TestingModule } from '@nestjs/testing';
import { VariationResolver } from './variation.resolver';

describe('VariationResolver', () => {
  let resolver: VariationResolver;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariationResolver],
    }).compile();
    resolver = module.get<VariationResolver>(VariationResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
