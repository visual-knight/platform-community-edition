import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcryptjs';
import { environment } from '../../environments/environment';
import { User } from '../../generated/prisma-client';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ProductService } from '../shared/product/product.service';
import { EmailService } from '../email/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { INVITATION_ERRORS } from './models/error.enum';
import { AuthService } from '../auth/auth.service';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../auth/models/auth-payload';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private paymentService: ProductService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);
    return this.prisma.client.createUser({
      email,
      password: hashedPassword,
      // contractUser: {
      //   create: {
      //     planStripeId: this.paymentService.getFreePlan().plans[0].id
      //   }
      // },
      role: 'OWNER'
    });
  }

  async deleteUser(user: User, userIdToDelete: string): Promise<User> {
    const userRef = this.prisma.client.user({ id: user.id });
    const contractUserOwner = await userRef.contractUserOwner();
    const userOwner = await userRef.contractUserOwner().owner();
    if (!contractUserOwner || !contractUserOwner.id) {
      throw new Error('You are not an owner!');
    }

    if (userOwner.id === user.id) {
      throw new Error('You are the owner. You can not delete yourself!');
    }

    const count = await this.prisma.client
      .usersConnection({
        where: { id: userIdToDelete, contractUser: { owner: { id: user.id } } }
      })
      .aggregate()
      .count();

    if (count < 1) {
      throw new Error('You have no relation to the user');
    }

    return this.prisma.client.deleteUser({ id: userIdToDelete });
  }

  async updateUser(
    user: User,
    { email, forename, lastname, phoneNumber }: UpdateUserInput
  ): Promise<User> {
    return this.prisma.client.updateUser({
      where: { id: user.id },
      data: {
        email,
        forename,
        lastname,
        phoneNumber
      }
    });
  }

  async inviteNewUser(user: User, invitationEmail: string) {
    const contractOwner = await this.prisma.client
      .user({ id: user.id })
      .contractUserOwner();
    if (!contractOwner) {
      throw new Error('You are not allowed to invite new user!');
    }
    const product = this.paymentService.findProductByPlanId(
      contractOwner.planStripeId
    );

    const contractOwnerUsersCount = (await this.prisma.client
      .user({ id: user.id })
      .contractUserOwner()
      .users()).length;
    if (contractOwnerUsersCount >= product.maxUsers) {
      throw new Error(`You can't invite more user. Upgrade to a higher plan!`);
    }

    const salt = genSaltSync(environment.saltRounds);
    const password = await hash('ACTIVATE', salt);

    const newUser = await this.prisma.client.createUser({
      email: invitationEmail,
      password,
      contractUser: {
        connect: {
          id: contractOwner.id
        }
      },
      role: 'CUSTOMER'
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
}
