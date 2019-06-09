import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MailData,
  RegistrationMailData,
  ForgotPasswordMailData,
  InvitationMail
} from '../models/emailconfig.interface';
import { environment } from '../../../environments/environment';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService
  ) {}

  async sendRegistrationMail(data: MailData) {
    const token = this.jwtService.sign(
      {
        email: data.email
      },
      {
        expiresIn: environment.email.registrationExpiresIn
      }
    );
    const registrationData: RegistrationMailData = {
      ...data,
      activationLink: `${environment.appDomain}sessions/verify?token=${token}`
    };

    const sendMailOptions = {
      from: `Registration <${environment.email.user}>`,
      to: data.to,
      subject: 'Welcome to Visual Knight Community Edition!',
      template: 'registration.html.hbs',
      context: registrationData
    };

    if (environment.production) {
      return this.mailService.sendMail(sendMailOptions);
    } else {
      console.log(sendMailOptions);
      return Promise.resolve();
    }
  }

  async sendForgotPasswordEmail(data: ForgotPasswordMailData) {
    const token = this.jwtService.sign(
      {
        email: data.email
      },
      {
        expiresIn: environment.email.forgotPasswordExpiresIn
      }
    );

    data.resetPasswordLink = `${
      environment.appDomain
    }sessions/reset-password?token=${token}`;

    const sendMailOptions = {
      from: `Password Reset <${environment.email.user}>`,
      to: data.to,
      subject: 'Reset password!',
      template: 'forgotpassword.html.hbs',
      context: data
    };

    if (environment.production) {
      return this.mailService.sendMail(sendMailOptions);
    } else {
      console.log(sendMailOptions);
      return Promise.resolve();
    }
  }

  async sendInvitationMail(data: InvitationMail) {
    const token = this.jwtService.sign(
      {
        email: data.email
      },
      {
        expiresIn: environment.email.invitationExpiresIn
      }
    );
    data.activationLink = `${
      environment.appDomain
    }sessions/invitation?token=${token}`;

    const sendMailOptions = {
      from: `Invitation <${environment.email.user}>`,
      to: data.to,
      subject: `You've been invited to Visual Knight Community Edition!`,
      template: 'invitation.html.hbs',
      context: data
    };

    if (environment.production) {
      return this.mailService.sendMail(sendMailOptions);
    } else {
      console.log(sendMailOptions);
      return Promise.resolve();
    }
  }
}
