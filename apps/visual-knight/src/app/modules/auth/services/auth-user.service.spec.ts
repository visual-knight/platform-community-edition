import { TestBed } from '@angular/core/testing';

import { AuthUserService } from './auth-user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('AuthUserService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule]
    })
  );

  it('should be created', () => {
    const service: AuthUserService = TestBed.get(AuthUserService);
    expect(service).toBeTruthy();
  });
});
