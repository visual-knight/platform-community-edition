import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { EmailModule } from './email/email.module';
import { ProjectModule } from './project/project.module';
import { TestsessionModule } from './testsession/testsession.module';
import { TestModule } from './test/test.module';
import { VariationModule } from './variation/variation.module';
import { environment } from '../environments/environment.prod';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => {
        return { req };
      },
      installSubscriptionHandlers: true,
      autoSchemaFile: environment.schemaPath
    }),
    AuthModule,
    UserModule,
    SharedModule,
    EmailModule,
    ProjectModule,
    TestsessionModule,
    TestModule,
    VariationModule
  ]
})
export class AppModule {}
