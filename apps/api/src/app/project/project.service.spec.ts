import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PhotonService } from '@visual-knight/api-interface';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        PhotonService,
        { provide: 'DB_URI', useValue: 'mock_db_url' }
      ]
    }).compile();
    service = module.get<ProjectService>(ProjectService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
