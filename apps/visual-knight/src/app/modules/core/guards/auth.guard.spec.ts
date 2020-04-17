import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: jest.fn()
          }
        }
      ],
      imports: [RouterTestingModule, ApolloTestingModule]
    });
    authGuard = TestBed.get<AuthGuard>(AuthGuard);
    authService = TestBed.get<AuthService>(AuthService);
    router = TestBed.get<Router>(Router);
  });

  describe('canLoad', () => {
    it('should return true if authenticated', () => {
      authService.isAuthenticated = jest.fn().mockReturnValueOnce(true);

      const resut = authGuard.canLoad();

      expect(resut).toBeTruthy();
    });

    it('should return false if NOT authenticated', () => {
      authService.isAuthenticated = jest.fn().mockReturnValueOnce(false);
      router.navigate = jest.fn();

      const resut = authGuard.canLoad();

      expect(resut).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/user']);
    });
  });

  describe('canActivate', () => {
    it('should return true if authenticated', () => {
      authService.isAuthenticated = jest.fn().mockReturnValueOnce(true);

      const resut = authGuard.canActivate();

      expect(resut).toBeTruthy();
    });

    it('should return false and redirect if NOT authenticated', () => {
      authService.isAuthenticated = jest.fn().mockReturnValueOnce(false);
      router.navigate = jest.fn();

      const resut = authGuard.canActivate();

      expect(resut).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/user']);
    });
  });
});
