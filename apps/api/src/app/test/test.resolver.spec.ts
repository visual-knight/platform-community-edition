import { Test, TestingModule } from '@nestjs/testing';
import { TestResolver } from './test.resolver';

describe('TestResolver', () => {
  let resolver: TestResolver;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestResolver],
    }).compile();
    resolver = module.get<TestResolver>(TestResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
