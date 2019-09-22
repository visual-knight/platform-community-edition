import { Test, TestingModule } from '@nestjs/testing';
import { CloudProviderService } from './cloud-provider.service';

describe('CloudProviderService', () => {
  let service: CloudProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudProviderService],
    }).compile();

    service = module.get<CloudProviderService>(CloudProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
