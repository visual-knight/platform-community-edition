import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User as PrismaUser } from '@platform-community-edition/prisma';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from './models/user';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../auth/models/auth-payload';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('id') id: string,
    @CurrentUser() user: PrismaUser
  ): Promise<User> {
    return this.userService.deleteUser(user, id);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: PrismaUser
  ): Promise<User> {
    return this.userService.updateUser(user, data);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  inviteNewUser(
    @Args('email') email: string,
    @CurrentUser() user: PrismaUser
  ): Promise<User> {
    return this.userService.inviteNewUser(user, email);
  }

  @Mutation(returns => AuthPayload)
  @UseGuards(GqlAuthGuard)
  completeInvitation(
    @Args('token') token: string,
    @Args('password') password: string
  ): Promise<AuthPayload> {
    return this.userService.completeInvitation(token, password);
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: PrismaUser): Promise<User> {
    return {
      active: user.active,
      email: user.email,
      forename: user.forename,
      lastname: user.lastname,
      id: user.id,
      phoneNumber: user.phoneNumber
    };
  }
}
