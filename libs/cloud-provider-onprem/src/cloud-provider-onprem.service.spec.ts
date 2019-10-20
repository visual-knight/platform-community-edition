import { Test, TestingModule } from '@nestjs/testing';
import { CloudProviderOnpremService } from './cloud-provider-onprem.service';

describe('CloudProviderOnpremService', () => {
  let service: CloudProviderOnpremService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudProviderOnpremService],
    }).compile();

    service = module.get<CloudProviderOnpremService>(CloudProviderOnpremService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
