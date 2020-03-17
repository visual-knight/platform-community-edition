import { Test, TestingModule } from '@nestjs/testing';
import { StaticController } from './static.controller';
import { CloudProviderService } from '@visual-knight/api-interface';

describe('Static Controller', () => {
  let controller: StaticController;
  let cloudProviderService: CloudProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticController],
      providers: [CloudProviderService]
    }).compile();

    controller = module.get<StaticController>(StaticController);
    cloudProviderService = module.get<CloudProviderService>(CloudProviderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
