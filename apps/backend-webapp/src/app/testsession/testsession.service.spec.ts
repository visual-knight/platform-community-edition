import { Test, TestingModule } from '@nestjs/testing';
import { TestsessionService } from './testsession.service';

describe('TestsessionService', () => {
  let service: TestsessionService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsessionService],
    }).compile();
    service = module.get<TestsessionService>(TestsessionService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
