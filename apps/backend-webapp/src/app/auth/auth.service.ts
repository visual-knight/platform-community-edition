import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { environment } from '../../environments/environment';
import { PrismaService } from '../shared/prisma/prisma.service';
import { User } from '@platform-community-edition/prisma';
import { EmailService } from '../email/services/email.service';
import { genSaltSync, hash } from 'bcryptjs';
import { ACTIVATION_ERRORS } from './interfaces/auth-errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async createToken(email: string) {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: environment.accessTokenLife,
      accessToken
    };
  }

  async resendVerifyEmail({ email, active }: User) {
    if (active) {
      throw new Error(ACTIVATION_ERRORS.ALREADY_DONE);
    }

    await this.emailService.sendRegistrationMail({
      email,
      to: email
    });

    return true;
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.prisma.client.user({ email: payload.email });
  }

  async verifyEmail(token: string): Promise<void> {
    let email: string, exp: number;
    try {
      ({ email, exp } = this.jwtService.verify(token));
    } catch (error) {
      throw new Error(ACTIVATION_ERRORS.INVALID);
    }

    if (Math.floor(Date.now() / 1000) > exp) {
      throw new Error(ACTIVATION_ERRORS.EXPIRED);
    }

    const user = await this.prisma.client.user({ email });
    if (user.active) {
      throw new Error(ACTIVATION_ERRORS.ALREADY_DONE);
    }

    await this.prisma.client.updateUser({
      where: { email: email },
      data: { active: true }
    });
  }

  async changePassword({ id }: User, password: string) {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    this.prisma.client.updateUser({
      data: {
        password: hashedPassword
      },
      where: { id }
    });

    return true;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.client.user({ email });
    if (!user) {
      throw new Error('email-doesnot-exists');
    }

    await this.emailService.sendForgotPasswordEmail({
      email: email,
      to: email,
      forename: user.forename,
      lastname: user.lastname
    });

    return true;
  }

  async resetPassword(password: string, token: string) {
    const { email } = this.jwtService.verify(token);

    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    await this.prisma.client.updateUser({
      data: {
        password: hashedPassword
      },
      where: { email }
    });

    return true;
  }
}
