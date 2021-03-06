import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User as PrismaUser, Role } from '@generated/photonjs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { UserType } from './models/user';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../auth/models/auth-payload';

@Resolver(of => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => UserType)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id') id: string, @CurrentUser() user: PrismaUser): Promise<UserType> {
    if (user.role !== Role.ADMIN) {
      throw new Error('Only admins are allowed to delete users');
    }
    return this.userService.deleteUser(user, id);
  }

  @Mutation(returns => UserType)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('data') data: UpdateUserInput, @CurrentUser() user: PrismaUser): Promise<UserType> {
    return this.userService.updateUser(user, data);
  }

  @Mutation(returns => UserType)
  @UseGuards(GqlAuthGuard)
  inviteNewUser(@Args('email') email: string, @CurrentUser() user: PrismaUser): Promise<UserType> {
    if (user.role !== Role.ADMIN) {
      throw new Error('Only admins are allowed to invite new users');
    }
    return this.userService.inviteNewUser(user, email);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  resendInvitationMail(@Args('userId') userId: string, @CurrentUser() user: PrismaUser): Promise<boolean> {
    return this.userService.resendInvitationEmail(user, userId);
  }

  @Mutation(returns => AuthPayload)
  completeInvitation(@Args('token') token: string, @Args('password') password: string): Promise<AuthPayload> {
    return this.userService.completeInvitation(token, password);
  }

  @Query(returns => UserType)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: PrismaUser): Promise<UserType> {
    return {
      active: user.active,
      email: user.email,
      forename: user.forename,
      lastname: user.lastname,
      id: user.id,
      apiKey: user.apiKey,
      role: user.role
    };
  }

  @Query(returns => [UserType])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<UserType[]> {
    return this.userService.userList();
  }
}
