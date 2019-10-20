import { Test, TestingModule } from '@nestjs/testing';
import { CloudProviderOnpremController } from './cloud-provider-onprem.controller';

describe('CloudProviderOnprem Controller', () => {
  let controller: CloudProviderOnpremController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudProviderOnpremController],
    }).compile();

    controller = module.get<CloudProviderOnpremController>(CloudProviderOnpremController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
