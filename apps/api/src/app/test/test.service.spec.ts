import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('TestService', () => {
  let service: TestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        PhotonService,
        CloudProviderService,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    service = module.get<TestService>(TestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
