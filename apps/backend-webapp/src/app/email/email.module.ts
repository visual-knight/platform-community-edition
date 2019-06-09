import { Module, Provider } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { environment } from '../../environments/environment';
import { EmailService } from './services/email.service';
import { resolve } from 'path';

const services: Provider[] = [EmailService];

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${environment.email.user}:${
        environment.email.password
      }@${environment.email.smtp}`,
      defaults: {
        from: `"Visual Knight Community Edition" <${environment.email.user}>`
      },
      template: {
        dir: environment.email.templateDirectory,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [...services],
  exports: [...services]
})
export class EmailModule {}
