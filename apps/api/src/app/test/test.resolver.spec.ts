import { Test, TestingModule } from '@nestjs/testing';
import { TestResolver } from './test.resolver';
import { TestService } from './test.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';
import { PrismaClient } from '@generated/photonjs';

describe('TestResolver', () => {
  let resolver: TestResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestResolver,
        TestService,
        PhotonService,
        CloudProviderService,
        PrismaClient,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    resolver = module.get<TestResolver>(TestResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
