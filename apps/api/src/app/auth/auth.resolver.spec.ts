import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/services/email.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhotonService } from '@visual-knight/api-interface';
import { User, Role } from '@generated/photonjs';

describe('AuthResolver', () => {
  let testingModule: TestingModule;
  let resolver: AuthResolver;
  let authService: AuthService;
  let userService: UserService;
  let emailService: EmailService;
  let logger: Logger;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            verifyEmail: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
          }
        },
        { provide: JwtService, useValue: {} },
        { provide: PhotonService, useValue: {} },
        {
          provide: EmailService,
          useValue: {
            sendRegistrationMail: jest.fn()
          }
        },
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn()
          }
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn()
          }
        }
      ]
    }).compile();
    resolver = testingModule.get<AuthResolver>(AuthResolver);
    authService = testingModule.get<AuthService>(AuthService);
    userService = testingModule.get<UserService>(UserService);
    emailService = testingModule.get<EmailService>(EmailService);
    logger = testingModule.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should call authService login method', () => {
      resolver.login('myemail@mail.test', 'password');

      return expect(authService.login).toHaveBeenCalledWith(
        'myemail@mail.test',
        'password'
      );
    });
  });

  describe('signup', () => {
    it('should create new user', async () => {
      const mockUser: User = {
        id: '132',
        email: 'test@mail.com',
        password: '12345',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastname: 'lastName',
        forename: 'forename',
        active: true,
        role: Role.ADMIN,
        apiKey: 'asdasdasf23'
      };
      const mockToken = {
        expiresIn: 3600,
        accessToken: 'token'
      };
      userService.createUser = jest.fn().mockReturnValueOnce(mockUser);
      emailService.sendRegistrationMail = jest.fn();
      authService.createToken = jest.fn().mockReturnValueOnce(mockToken);

      const signupResult = await resolver.signup(
        mockUser.email,
        mockUser.password
      );

      expect(signupResult).toStrictEqual({
        token: mockToken,
        user: mockUser
      });
      expect(emailService.sendRegistrationMail).toHaveBeenCalledWith({
        email: mockUser.email,
        to: mockUser.email
      });
      expect(authService.createToken).toHaveBeenCalledWith(mockUser.email);
    });

    it('should throw an error if the email address is already registered', async () => {
      userService.createUser = jest.fn().mockRejectedValue({
        message:
          'A unique constraint would be violated on User. Details: Field name = email'
      });

      await expect(
        resolver.signup('myemail@mail.test', 'password')
      ).rejects.toThrowError(new Error('Email is already registered'));
    });

    it('should throw an unknow error', async () => {
      const errorMock = {
        message: 'Some unexpected error'
      };
      logger.error = jest.fn();
      userService.createUser = jest.fn().mockRejectedValue(errorMock);

      await expect(
        resolver.signup('myemail@mail.test', 'password')
      ).rejects.toThrowError(new Error('Unknown server error'));
      expect(logger.error).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('verifyEmail', () => {
    it('should call authService verifyEmail method', async () => {
      authService.verifyEmail = jest.fn();

      const result = await resolver.verifyEmail('myemail@mail.test');

      expect(result).toBe(true);
      expect(authService.verifyEmail).toHaveBeenCalledWith('myemail@mail.test');
    });
  });

  describe('forgotPassword', () => {
    it('should call authService forgotPassword method', async () => {
      authService.forgotPassword = jest.fn();

      const result = await resolver.forgotPassword('myemail@mail.test');

      expect(result).toBe(true);
      expect(authService.forgotPassword).toHaveBeenCalledWith('myemail@mail.test');
    });
  });

  describe('resetPassword', () => {
    it('should call authService resetPassword method', async () => {
      authService.resetPassword = jest.fn();

      const result = await resolver.resetPassword('myemail@mail.test', 'token');

      expect(result).toBe(true);
      expect(authService.resetPassword).toHaveBeenCalledWith('myemail@mail.test', 'token');
    });
  });
});
