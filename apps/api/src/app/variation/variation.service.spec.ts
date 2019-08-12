import { Test, TestingModule } from '@nestjs/testing';
import { VariationService } from './variation.service';

describe('VariationService', () => {
  let service: VariationService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariationService],
    }).compile();
    service = module.get<VariationService>(VariationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
