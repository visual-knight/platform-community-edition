import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('TestService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    })
  );

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
