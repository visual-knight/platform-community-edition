import { Test, TestingModule } from '@nestjs/testing';
import { ComparisonService } from './comparison.service';

describe('ComparisonService', () => {
  let service: ComparisonService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComparisonService]
    }).compile();
    service = module.get<ComparisonService>(ComparisonService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
