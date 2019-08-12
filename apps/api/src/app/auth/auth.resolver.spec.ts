import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthModule } from './auth.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { EmailService } from '../email/services/email.service';

import { AwsLambdaService } from '../shared/aws';
import { ACTIVATION_ERRORS } from './interfaces/auth-errors';

describe('AuthResolver', () => {
  let testingModule: TestingModule;
  let resolver: AuthResolver;
  let prisma: PrismaService;
  let emailService: EmailService;
  let prismaCreateUserSpy;
  let prismaUpdateUserSpy;
  let prismaUserSpy;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile();
    resolver = testingModule.get<AuthResolver>(AuthResolver);
    prisma = testingModule.get<PrismaService>(PrismaService);
    emailService = testingModule.get<EmailService>(EmailService);

    spyOn(emailService, 'sendRegistrationMail').and.stub();
    prismaCreateUserSpy = spyOn(prisma.client, 'createUser');
    prismaUpdateUserSpy = spyOn(prisma.client, 'updateUser');
    prismaUserSpy = spyOn(prisma.client, 'user');
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should throw user not found error on login if the email is not found', () => {
      prismaUserSpy.and.returnValue(null);

      return expect(
        resolver.login('myemail@mail.test', 'password')
      ).rejects.toThrowError(`No such user found for email: myemail@mail.test`);
    });

    it('should throw invalid password on login if the password is wrong', () => {
      prismaUserSpy.and.returnValue({ password: '$sometesthash' });

      return expect(
        resolver.login('myemail@mail.test', 'password')
      ).rejects.toThrowError('Invalid password');
    });

    it('should return the user with AuthPayload and without password', () => {
      prismaUserSpy.and.returnValue({
        email: 'myemail@mail.test',
        password: '$2a$10$.2YPyDSwJ69Cs0qu/21ad.jYiZ34TlHRCe7Vem6c0M3OrKBh4Bcyy'
      });

      return expect(
        resolver.login('myemail@mail.test', 'password')
      ).resolves.toEqual({
        token: {
          accessToken: 'accessTokenFor_myemail@mail.test',
          expiresIn: 3600
        },
        user: {
          email: 'myemail@mail.test'
        }
      });
    });
  });

  describe('signup', () => {
    it('should return the user and token after succes registration', () => {
      prismaUserSpy.and.returnValue({
        email: 'myemail@mail.test'
      });

      prismaCreateUserSpy.and.returnValue({
        email: 'myemail@mail.test'
      });

      return expect(
        resolver.signup('myemail@mail.test', 'password')
      ).resolves.toEqual({
        token: {
          accessToken: 'accessTokenFor_myemail@mail.test',
          expiresIn: 3600
        },
        user: {
          email: 'myemail@mail.test'
        }
      });
    });

    it('should throw an error if the email address is already registered', () => {
      prismaCreateUserSpy.and.throwError(
        'A unique constraint would be violated on User. Details: Field name = email'
      );

      return expect(
        resolver.signup('myemail@mail.test', 'password')
      ).rejects.toThrowError('Email is already registered');
    });

    it('should throw an unknow error', () => {
      prismaCreateUserSpy.and.throwError('Some unexpected error');

      return expect(
        resolver.signup('myemail@mail.test', 'password')
      ).rejects.toThrowError('Unknown server error');
    });
  });

  describe('verify email', () => {
    it('should return true if the verification was successful in dev mode', async () => {
      prismaUserSpy.and.returnValue({
        email: 'myemail@mail.test',
        contractUser: () =>
          Promise.resolve({
            id: 'some_id',
            planStripeId: 'stripe_id'
          })
      });
      prismaUpdateUserSpy.and.stub();

      expect(await resolver.verifyEmail('valid_token')).toBeTruthy();
    });

    it('should throw an error if token is invalid', () => {
      return expect(resolver.verifyEmail('invalid')).rejects.toThrowError(
        ACTIVATION_ERRORS.INVALID
      );
    });

    it('should throw an error if token is expired', () => {
      prismaUserSpy.and.returnValue({
        email: 'myemail@mail.test'
      });

      return expect(resolver.verifyEmail('expired')).rejects.toThrowError(
        ACTIVATION_ERRORS.EXPIRED
      );
    });

    it('should throw an error if the user is already activated', () => {
      prismaUserSpy.and.returnValue({
        email: 'myemail@mail.test',
        active: true
      });

      return expect(resolver.verifyEmail('valid_token')).rejects.toThrowError(
        ACTIVATION_ERRORS.ALREADY_DONE
      );
    });
  });
});
