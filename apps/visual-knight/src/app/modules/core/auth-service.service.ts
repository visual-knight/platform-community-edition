import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType, CurrentUserGQL, SignupGQL, LoginGQL, ForgotPasswordGQL, ResetPasswordGQL } from './types';
import { map, tap, filter } from 'rxjs/operators';
import { GraphQLError } from 'graphql';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // expose all data

  public authErrorMessages$: Observable<GraphQLError[]>;
  public isLoading$: Observable<boolean>;
  public user$: Observable<UserType>;

  constructor(
    private router: Router,
    private currentUserGQL: CurrentUserGQL,
    private signupGQL: SignupGQL,
    private loginGQL: LoginGQL,
    private forgotPasswordGQL: ForgotPasswordGQL,
    private resetPasswordGQL: ResetPasswordGQL
  ) {
    const currentUser$ = this.currentUserGQL.watch().valueChanges;

    this.user$ = currentUser$.pipe(
      filter(({ data }) => !!data),
      map(({ data }) => data.me)
    );
    this.isLoading$ = currentUser$.pipe(map(result => result.loading));
    this.authErrorMessages$ = currentUser$.pipe(map(result => result.errors)) as any; // use any because of a prettier bug
  }

  get authenticated(): boolean {
    return localStorage.getItem('visual-knight-token') !== null;
  }

  public signup({ email, password }) {
    return this.signupGQL.mutate({ email, password }).pipe(
      map(result => result.data.signup),
      tap(signupData => {
        localStorage.setItem('visual-knight-token', signupData.token.accessToken);
      })
    );
  }
  public login({ email, password }) {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(result => result.data.login),
      tap(loginData => {
        localStorage.setItem('visual-knight-token', loginData.token.accessToken);
      })
    );
  }

  public forgotPassword(email: string) {
    return this.forgotPasswordGQL.mutate({ email });
  }

  public resetPassword(password: string, token: string) {
    return this.resetPasswordGQL.mutate({ password, token });
  }

  public logout() {
    // this.apollo.getClient().resetStore();
    this.router.navigateByUrl('/user');
  }
}

export enum ACTIVATION_STATE {
  ALREADY_DONE = 'verification.done',
  EXPIRED = 'verification.expired',
  DONE = 'ok'
}

export enum INVITATION_STATE {
  ALREADY_DONE = 'invitation.done',
  EXPIRED = 'invitation.expired',
  DONE = 'ok'
}
