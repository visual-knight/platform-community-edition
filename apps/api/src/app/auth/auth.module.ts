import { Module, Global } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { EmailModule } from '../email/email.module';
import { GqlApiGuard } from './guards/api.guard';

@Global()
@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    GqlApiGuard
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: environment.accessTokenSecret,
      signOptions: {
        expiresIn: environment.accessTokenLife
      }
    }),
    SharedModule,
    UserModule,
    EmailModule
  ],
  exports: [AuthService, JwtModule, SharedModule]
})
export class AuthModule {}
