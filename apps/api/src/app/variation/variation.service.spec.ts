import { Test, TestingModule } from '@nestjs/testing';
import { VariationService } from './variation.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('VariationService', () => {
  let service: VariationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariationService,
        { provide: PhotonService, useValue: {} },
        { provide: CloudProviderService, useValue: {} }
      ]
    }).compile();
    service = module.get<VariationService>(VariationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
