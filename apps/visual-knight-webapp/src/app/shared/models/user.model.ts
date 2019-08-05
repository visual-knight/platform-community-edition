import { getGravatarImageHash } from '../helpers/utils';

export class User {
  public contractUserOwner: {
    id: string;
  };

  public contractUser: {
    planStripeId: string;
    id: string;
  };

  public gravatarImage: string;

  constructor(
    public id: string,
    public email: string,
    public password: string,
    public forename: string,
    public lastname: string,
    public phoneNumber: string,
    public plan: string,
    public active: boolean,
    public role: UserRole
  ) {}
}

export enum UserRole {
  OWNER = 'OWNER',
  CUSTOMER = 'CUSTOMER'
}
