import { User } from '../../shared/models/user.model';

export class SessionsSignUpAction {
  static readonly type = '[Sessions] Sign up';
  constructor(public payload: User) {}
}
