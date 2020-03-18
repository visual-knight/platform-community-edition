import { Test, TestingModule } from '@nestjs/testing';
import { TestsessionResolver } from './testsession.resolver';
import { TestsessionService } from './testsession.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('TestsessionResolver', () => {
  let resolver: TestsessionResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsessionResolver,
        TestsessionService,
        CloudProviderService,
        PhotonService,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    resolver = module.get<TestsessionResolver>(TestsessionResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
