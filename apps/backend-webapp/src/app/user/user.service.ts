import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcryptjs';
import { environment } from '../../environments/environment';
import { User } from '@platform-community-edition/prisma';
import { PrismaService } from '../shared/prisma/prisma.service';
import { EmailService } from '../email/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { INVITATION_ERRORS } from './models/error.enum';
import { AuthService } from '../auth/auth.service';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../auth/models/auth-payload';
import uuidAPIKey from 'uuid-apikey';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);
    const apiKey = this.generateApiKey();

    return this.prisma.client.createUser({
      email,
      password: hashedPassword,
      apiKey: apiKey.apiKey
    });
  }

  async deleteUser(user: User, userIdToDelete: string): Promise<User> {
    if (user.role !== 'ADMIN') {
      throw new Error('You are not allowed to delete a user!');
    }

    return this.prisma.client.deleteUser({ id: userIdToDelete });
  }

  async updateUser(
    user: User,
    { email, forename, lastname }: UpdateUserInput
  ): Promise<User> {
    return this.prisma.client.updateUser({
      where: { id: user.id },
      data: {
        email,
        forename,
        lastname
      }
    });
  }

  async inviteNewUser(user: User, invitationEmail: string) {
    if (user.role !== 'ADMIN') {
      throw new Error('You are not allowed to invite new user!');
    }

    const salt = genSaltSync(environment.saltRounds);
    const password = await hash('ACTIVATE', salt);
    const apiKey = this.generateApiKey();

    const newUser = await this.prisma.client.createUser({
      email: invitationEmail,
      password,
      apiKey: apiKey.apiKey
    });

    this.emailService.sendInvitationMail({
      email: invitationEmail,
      to: invitationEmail,
      activationLink: null,
      invitedBy: user.email
    });

    return newUser;
  }

  async completeInvitation(
    token: string,
    password: string
  ): Promise<AuthPayload> {
    const { email, exp } = this.jwtService.verify(token);
    const user = await this.prisma.client.user({ email });
    if (user.active) {
      throw new Error(INVITATION_ERRORS.ALREADY_DONE);
    }
    if (Math.floor(Date.now() / 1000) > exp) {
      throw new Error(INVITATION_ERRORS.EXPIRED);
    }

    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    const updatedUser = await this.prisma.client.updateUser({
      where: { email: email },
      data: { active: true, password: hashedPassword }
    });

    const accessToken = await this.authService.createToken(updatedUser.id);

    return {
      token: accessToken,
      user: updatedUser
    };
  }

  private generateApiKey(): ApiKey {
    return uuidAPIKey.create({ noDashes: true });
  }
}

interface ApiKey {
  uuid: string;
  apiKey: string;
}
