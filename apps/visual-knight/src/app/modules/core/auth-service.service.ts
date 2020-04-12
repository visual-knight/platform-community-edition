import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
  UserType,
  CurrentUserGQL,
  SignupGQL,
  LoginGQL,
  ForgotPasswordGQL,
  ResetPasswordGQL
} from './types';
import { map, tap, filter, catchError, switchMap } from 'rxjs/operators';
import { GraphQLError } from 'graphql';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import * as jwt_decode from 'jwt-decode';

export const AUTH_TOKEN_NAME = 'visual-knight-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // expose all data

  public authErrorMessages$: Observable<GraphQLError[]>;
  public isLoading$: Observable<boolean>;
  public user$: Observable<UserType>;
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isAuthenticated()
  );

  constructor(
    private router: Router,
    private apollo: Apollo,
    private currentUserGQL: CurrentUserGQL,
    private signupGQL: SignupGQL,
    private loginGQL: LoginGQL,
    private forgotPasswordGQL: ForgotPasswordGQL,
    private resetPasswordGQL: ResetPasswordGQL
  ) {
    const currentUser$ = this.currentUserGQL.watch().valueChanges.pipe(
      catchError(() => {
        return of({ data: null, loading: false });
      })
    );

    this.user$ = this.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      switchMap(() =>
        currentUser$.pipe(
          filter(({ data }) => !!data),
          map(({ data }) => data.me)
        )
      )
    );

    this.isLoading$ = this.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      switchMap(() => currentUser$.pipe(map(result => result.loading)))
    );
  }

  public signup({ email, password }) {
    return this.signupGQL.mutate({ email, password }).pipe(
      map(result => result.data.signup),
      tap(signupData => {
        localStorage.setItem(AUTH_TOKEN_NAME, signupData.token.accessToken);
        this.isAuthenticated$.next(true);
      })
    );
  }

  public login({ email, password }) {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(result => result.data.login),
      tap(loginData => {
        localStorage.setItem(AUTH_TOKEN_NAME, loginData.token.accessToken);
        this.isAuthenticated$.next(true);
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
    localStorage.removeItem(AUTH_TOKEN_NAME);
    this.isAuthenticated$.next(false);
    this.apollo.getClient().resetStore();
    this.router.navigateByUrl('/user');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    if (!token) {
      return false;
    }

    const date = this.getTokenExpirationDate(token);
    if (!date) {
      return true;
    }

    if (date.valueOf() > new Date().valueOf()) {
      return true;
    }
    return false;
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
