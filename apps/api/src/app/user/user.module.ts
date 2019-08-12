import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { SharedModule } from '../shared/shared.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [SharedModule, EmailModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
