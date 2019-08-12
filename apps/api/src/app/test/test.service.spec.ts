import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService],
    }).compile();
    service = module.get<TestService>(TestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
