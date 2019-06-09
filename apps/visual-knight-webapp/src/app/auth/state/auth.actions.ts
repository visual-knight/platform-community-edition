export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
}

export class LogoutExpired {
  static readonly type = '[Auth] Logout expired token';
}

export class LoadUserInfo {
  static readonly type = '[Auth] LoadUserInfo';
}

export class UserCompleteInvitationAction {
  static readonly type = '[Auth] complete invitation';
  constructor(public payload: { token: string; password: string }) {}
}

export class UpdateUserPlanIdAction {
  static readonly type = '[Auth] update user plan id';
  constructor(public payload: string) {}
}

export class UpdateAccessTokenAction {
  static readonly type = '[Auth] update access token';
  constructor(public payload: string) {}
}

export class SubscribeVerificationAction {
  static readonly type = '[Auth] subscribe to user verification change';
}
