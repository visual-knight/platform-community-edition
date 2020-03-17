import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        ProjectService,
        PhotonService,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    resolver = module.get<ProjectResolver>(ProjectResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
