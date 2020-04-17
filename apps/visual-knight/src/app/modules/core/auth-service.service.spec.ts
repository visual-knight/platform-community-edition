import { TestBed } from '@angular/core/testing';

import { AuthService, AUTH_TOKEN_NAME } from './auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
jest.mock('jwt-decode');
import * as jwt_decode from 'jwt-decode';

describe('AuthServiceService', () => {
  let authService: AuthService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule, ApolloTestingModule]
    });
    authService = TestBed.get<AuthService>(AuthService);
  });

  describe('getTokenExpirationDate', () => {
    it('should return null if token does not have exp', () => {
      jwt_decode.mockReturnValueOnce({
        exp: undefined
      });

      const result = authService.getTokenExpirationDate('token');

      expect(result).toBeNull();
    });

    it('should return date if token has exp', () => {
      const expireDateMock = 123;
      const expectedDate = new Date(0);
      expectedDate.setUTCSeconds(expireDateMock);
      jwt_decode.mockReturnValueOnce({
        exp: expireDateMock
      });

      const result = authService.getTokenExpirationDate('token');

      expect(result).toStrictEqual(expectedDate);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false if no token', () => {
      localStorage.removeItem(AUTH_TOKEN_NAME);

      const result = authService.isAuthenticated();

      expect(result).toBeFalsy();
    });

    it('should return true if no expiration date', () => {
      localStorage.setItem(AUTH_TOKEN_NAME, 'token');
      authService.getTokenExpirationDate = jest.fn().mockReturnValue(null);

      const result = authService.isAuthenticated();

      expect(result).toBeTruthy();
    });

    it('should return false if expiration date < date', () => {
      const expireDateMock = new Date(Date.now() - 100);
      localStorage.setItem(AUTH_TOKEN_NAME, 'token');
      authService.getTokenExpirationDate = jest
        .fn()
        .mockReturnValue(expireDateMock);

      const result = authService.isAuthenticated();

      expect(result).toBeFalsy();
    });

    it('should return true if expiration date > date', () => {
      const expireDateMock = new Date(Date.now() + 100);
      localStorage.setItem(AUTH_TOKEN_NAME, 'token');
      authService.getTokenExpirationDate = jest
        .fn()
        .mockReturnValue(expireDateMock);

      const result = authService.isAuthenticated();

      expect(result).toBeTruthy();
    });
  });
});
