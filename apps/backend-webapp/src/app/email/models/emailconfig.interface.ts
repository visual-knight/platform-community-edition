export interface MailData {
  to: string;
  email: string;
  forename?: string;
  lastname?: string;
}

export interface ForgotPasswordMailData extends MailData {
  resetPasswordLink?: string;
}

export interface RegistrationMailData extends MailData {
  activationLink: string;
}

export interface InvitationMail extends RegistrationMailData {
  invitedBy: string;
}
