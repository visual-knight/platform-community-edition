import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectResolver],
    }).compile();
    resolver = module.get<ProjectResolver>(ProjectResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
