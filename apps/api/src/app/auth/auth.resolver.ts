import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/services/email.service';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthPayload } from './models/auth-payload';
import { GqlAuthGuard } from './guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '@generated/photonjs';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly logger: Logger
  ) {}

  @Mutation(returns => AuthPayload)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<AuthPayload> {
    return this.authService.login(email, password);
  }

  @Mutation(returns => AuthPayload)
  async signup(@Args('email') email: string, @Args('password') password: string): Promise<AuthPayload> {
    let user: User;
    try {
      user = await this.userService.createUser(email, password);
    } catch (error) {
      if (error.message === 'A unique constraint would be violated on User. Details: Field name = email') {
        throw new Error('Email is already registered');
      } else {
        this.logger.error(error);
        throw new Error('Unknown server error');
      }
    }

    await this.emailService.sendRegistrationMail({
      email: user.email,
      to: user.email
    });

    const token = await this.authService.createToken(user.email);

    return {
      token,
      user
    };
  }

  @Mutation(returns => Boolean)
  async verifyEmail(@Args('token') token: string) {
    await this.authService.verifyEmail(token);

    return true;
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async resendVerifyEmail(@CurrentUser() user: User) {
    await this.authService.resendVerifyEmail(user);

    return true;
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async changePassword(@Args('password') password: string, @CurrentUser() user: User) {
    await this.authService.changePassword(user, password);

    return true;
  }

  @Mutation(returns => Boolean)
  async forgotPassword(@Args('email') email: string) {
    await this.authService.forgotPassword(email);

    return true;
  }

  @Mutation(returns => Boolean)
  async resetPassword(@Args('password') password: string, @Args('token') token: string) {
    await this.authService.resetPassword(password, token);

    return true;
  }

  // async token(@Args('refreshToken') refreshToken: string) {
  //   const { userId } = this.jwtService.verify(refreshToken);
  //   if (this.refreshTokenService.validate(refreshToken)) {
  //   }

  //   // if invalid delete token from db
  //   // if(false) {
  //   //   await ctx.db.mutation.deleteRefreshTokenList({ where: {userId}});
  //   //   throw new Error('Refresh token is invalid');
  //   // }

  //   const token = this.createAccessToken(userId);

  //   return token;
  // }
}
