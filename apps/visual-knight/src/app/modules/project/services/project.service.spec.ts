import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProjectService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [ApolloTestingModule] })
  );

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
