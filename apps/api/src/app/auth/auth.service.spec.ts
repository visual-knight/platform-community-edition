import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/services/email.service';
import { ACTIVATION_ERRORS } from './interfaces/auth-errors';
import { CloudProviderService } from '@visual-knight/api-interface';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhotonService } from '@visual-knight/api-interface';
import { User, Role } from '@generated/photonjs';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let testingModule: TestingModule;
  let authService: AuthService;
  let userService: UserService;
  let emailService: EmailService;
  let logger: Logger;
  let jwtService: JwtService;
  let photonService: PhotonService;
  const user: User = {
    id: '132',
    email: 'myemail@mail.test',
    password: '12345',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastname: 'lastName',
    forename: 'forename',
    active: true,
    role: Role.ADMIN,
    apiKey: 'asdasdasf23'
  };

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn()
          }
        },
        {
          provide: PhotonService,
          useValue: {
            user: {
              findOne: jest.fn(),
              update: jest.fn()
            }
          }
        },
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
    authService = testingModule.get<AuthService>(AuthService);
    userService = testingModule.get<UserService>(UserService);
    emailService = testingModule.get<EmailService>(EmailService);
    logger = testingModule.get<Logger>(Logger);
    jwtService = testingModule.get<JwtService>(JwtService);
    photonService = testingModule.get<PhotonService>(PhotonService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createToken', () => {
    it('should return token', async () => {
      const mockUser = user;
      const accessTokenMock = 'tokenMock';
      jwtService.sign = jest.fn().mockReturnValueOnce(accessTokenMock);

      const result = await authService.createToken(mockUser.email);

      expect(result).toStrictEqual({
        accessToken: accessTokenMock,
        expiresIn: environment.accessTokenLife
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email
      });
    });
  });

  describe('resendVerifyEmail', () => {
    it('should call emailService sendRegistrationMail', async () => {
      const mockUser = user;
      mockUser.active = false;
      emailService.sendRegistrationMail = jest.fn();

      const result = await authService.resendVerifyEmail(mockUser);

      expect(emailService.sendRegistrationMail).toHaveBeenCalledWith({
        email: mockUser.email,
        to: mockUser.email
      });
      expect(result).toBeTruthy();
    });

    it('should throw error if not active user', async () => {
      const mockUser = user;
      mockUser.active = true;
      emailService.sendRegistrationMail = jest.fn();

      await expect(
        authService.resendVerifyEmail(mockUser)
      ).rejects.toThrowError(new Error(ACTIVATION_ERRORS.ALREADY_DONE));
    });
  });

  describe('validateUser', () => {
    it('should search user in photonService', () => {
      const mockUser = user;
      photonService.user.findOne = jest.fn();

      authService.validateUser({ email: mockUser.email });

      return expect(photonService.user.findOne).toHaveBeenCalledWith({
        where: { email: mockUser.email }
      });
    });
  });

  describe('login', () => {
    it('should return the user with AuthPayload and without password', async () => {
      const mockUser = user;
      mockUser.password = 'password';
      const paswordHash =
        '$2a$10$.2YPyDSwJ69Cs0qu/21ad.jYiZ34TlHRCe7Vem6c0M3OrKBh4Bcyy';
      const mockToken = 'token';
      photonService.user.findOne = jest.fn().mockResolvedValueOnce({
        ...mockUser,
        password: paswordHash
      });
      authService.createToken = jest.fn().mockReturnValueOnce(mockToken);

      const result = await authService.login(mockUser.email, mockUser.password);

      delete mockUser.password;
      expect(result).toStrictEqual({ user: mockUser, token: mockToken });
      expect(authService.createToken).toHaveBeenCalledWith(mockUser.email);
    });

    it('should throw user not found error on login if the email is not found', () => {
      const mockUser = user;
      photonService.user.findOne = jest.fn().mockResolvedValueOnce(null);

      return expect(
        authService.login(mockUser.email, mockUser.password)
      ).rejects.toThrowError(
        new Error(`No such user found for email: ${mockUser.email}`)
      );
    });

    it('should throw invalid password on login if the password is wrong', () => {
      const mockUser = user;
      mockUser.password = 'password';
      photonService.user.findOne = jest.fn().mockResolvedValueOnce({
        email: mockUser.email,
        password: 'wrongHash'
      });

      return expect(
        authService.login(mockUser.email, mockUser.password)
      ).rejects.toThrowError(new Error('Invalid password'));
    });
  });

  describe('verify email', () => {
    it('should return true if the verification was successful in dev mode', async () => {
      const token = 'valid_token';
      const mockUser = user;
      photonService.user.findOne = jest.fn().mockResolvedValueOnce({
        email: mockUser.email
      });
      photonService.user.update = jest.fn();
      jwtService.verify = jest.fn().mockReturnValueOnce({
        email: mockUser.email,
        exp: Math.floor(Date.now() / 1000)
      });

      await authService.verifyEmail(token);

      expect(photonService.user.update).toHaveBeenCalledWith({
        where: { email: mockUser.email },
        data: { active: true }
      });
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });

    it('should throw an error if token is invalid', () => {
      return expect(authService.verifyEmail('invalid')).rejects.toThrowError(
        new Error(ACTIVATION_ERRORS.INVALID)
      );
    });

    it('should throw an error if token is expired', () => {
      jwtService.verify = jest.fn().mockReturnValueOnce({
        email: user.email,
        exp: Math.floor(Date.now() / 1000) - 1
      });

      return expect(authService.verifyEmail('expired')).rejects.toThrowError(
        new Error(ACTIVATION_ERRORS.EXPIRED)
      );
    });

    it('should throw an error if the user is already activated', () => {
      const mockUser = user;
      mockUser.active = true;
      photonService.user.findOne = jest.fn().mockResolvedValueOnce(mockUser);
      jwtService.verify = jest.fn().mockReturnValueOnce({
        email: mockUser.email,
        exp: Math.floor(Date.now() / 1000)
      });

      return expect(
        authService.verifyEmail('valid_token')
      ).rejects.toThrowError(new Error(ACTIVATION_ERRORS.ALREADY_DONE));
    });
  });
});
