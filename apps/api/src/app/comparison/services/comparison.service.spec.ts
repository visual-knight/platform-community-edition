import { Test, TestingModule } from '@nestjs/testing';
import { ComparisonService } from './comparison.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('ComparisonService', () => {
  let service: ComparisonService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComparisonService,
        { provide: PhotonService, useValue: {} },
        { provide: CloudProviderService, useValue: {} }
      ]
    }).compile();
    service = module.get<ComparisonService>(ComparisonService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
