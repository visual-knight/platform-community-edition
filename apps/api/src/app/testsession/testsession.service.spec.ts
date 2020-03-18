import { Test, TestingModule } from '@nestjs/testing';
import { TestsessionService } from './testsession.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('TestsessionService', () => {
  let service: TestsessionService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsessionService,
        CloudProviderService,
        PhotonService,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    service = module.get<TestsessionService>(TestsessionService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
