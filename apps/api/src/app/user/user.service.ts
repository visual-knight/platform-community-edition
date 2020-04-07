import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcryptjs';
import { environment } from '../../environments/environment';
import { EmailService } from '../email/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { INVITATION_ERRORS } from './models/error.enum';
import { AuthService } from '../auth/auth.service';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../auth/models/auth-payload';
import uuidAPIKey from 'uuid-apikey';
import { PhotonService } from '@visual-knight/api-interface';
import { User, Role } from '@generated/photonjs';

@Injectable()
export class UserService {
  constructor(
    private emailService: EmailService,
    private jwtService: JwtService,
    private authService: AuthService,
    private photonService: PhotonService
  ) {
    //create default user if there are none in DB
    this.userList().then(userList => {
      if (userList.length === 0) {
        const defaultEmail = 'visual-knight-community@example.com';
        const defaultPassword = 'yourPassw0rd!';
        const defaultRole = Role.ADMIN;

        this.createUser(defaultEmail, defaultPassword, defaultRole).then(
          user => {
            console.log('#########################');
            console.log('## CREATING ADMIN USER ##');
            console.log('#########################');
            console.log('');
            console.log(
              `The user with the email "${defaultEmail}" and password "${defaultPassword}" was created`
            );
            console.log(`The Api key is: ${user.apiKey}`);
          }
        );
      }
    });
  }

  async userList() {
    return this.photonService.user.findMany({
      select: {
        id: true,
        email: true,
        forename: true,
        lastname: true,
        active: true,
        apiKey: true,
        role: true
      }
    });
  }

  async createUser(
    email: string,
    password: string,
    role: Role = Role.CUSTOMER
  ): Promise<User> {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);
    const apiKey = this.generateApiKey();

    return this.photonService.user.create({
      data: {
        email,
        apiKey: apiKey.apiKey,
        password: hashedPassword,
        role
      }
    });
  }

  async deleteUser(user: User, userIdToDelete: string): Promise<User> {
    if (user.role !== Role.ADMIN) {
      throw new Error('You are not allowed to delete a user!');
    }

    return this.photonService.user.delete({ where: { id: userIdToDelete } });
  }

  async updateUser(
    user: User,
    { email, forename, lastname }: UpdateUserInput
  ): Promise<User> {
    return this.photonService.user.update({
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
    const password = await hash('ACTIVATE' + this.generateApiKey().uuid, salt);
    const apiKey = this.generateApiKey();

    const newUser = await this.photonService.user.create({
      data: {
        password,
        email: invitationEmail,
        apiKey: apiKey.apiKey
      }
    });

    this.emailService.sendInvitationMail({
      email: invitationEmail,
      to: invitationEmail,
      activationLink: null,
      invitedBy: user.email
    });

    return newUser;
  }

  async resendInvitationEmail(user: User, invitationUserId: string) {
    if (user.role !== 'ADMIN') {
      throw new Error('You are not allowed to invite new user!');
    }

    const invitationUser = await this.photonService.user.findOne({
      where: { id: invitationUserId }
    });

    this.emailService.sendInvitationMail({
      email: invitationUser.email,
      to: invitationUser.email,
      activationLink: null,
      invitedBy: user.email
    });

    return true;
  }

  async completeInvitation(
    token: string,
    password: string
  ): Promise<AuthPayload> {
    const { email, exp } = this.jwtService.verify(token);
    const user = await this.photonService.user.findOne({ where: { email } });
    if (user.active) {
      throw new Error(INVITATION_ERRORS.ALREADY_DONE);
    }
    if (Math.floor(Date.now() / 1000) > exp) {
      throw new Error(INVITATION_ERRORS.EXPIRED);
    }

    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    const updatedUser = await this.photonService.user.update({
      where: { email: email },
      data: { active: true, password: hashedPassword }
    });

    const accessToken = await this.authService.createToken(updatedUser.email);

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
