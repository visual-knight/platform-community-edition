import { Test, TestingModule } from '@nestjs/testing';
import { TestsessionResolver } from './testsession.resolver';

describe('TestsessionResolver', () => {
  let resolver: TestsessionResolver;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsessionResolver],
    }).compile();
    resolver = module.get<TestsessionResolver>(TestsessionResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
