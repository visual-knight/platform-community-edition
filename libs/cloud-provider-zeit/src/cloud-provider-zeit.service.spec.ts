import { Test, TestingModule } from '@nestjs/testing';
import { CloudProviderZeitService } from './cloud-provider-zeit.service';

describe('CloudProviderZeitService', () => {
  let service: CloudProviderZeitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudProviderZeitService],
    }).compile();

    service = module.get<CloudProviderZeitService>(CloudProviderZeitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
