import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './shared/shared.module';
import { EmailModule } from './email/email.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectModule } from './project/project.module';
import { TestsessionModule } from './testsession/testsession.module';
import { TestModule } from './test/test.module';
import { VariationModule } from './variation/variation.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => {
        return { req };
      },
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql'
    }),
    AuthModule,
    UserModule,
    PaymentModule,
    SharedModule,
    EmailModule,
    DashboardModule,
    ProjectModule,
    TestsessionModule,
    TestModule,
    VariationModule
  ]
})
export class AppModule {}
