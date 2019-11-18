import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserType, CurrentUserGQL, SignupGQL, LoginGQL, ForgotPasswordGQL, ResetPasswordGQL } from './types';
import { map, tap, filter, catchError, switchMap } from 'rxjs/operators';
import { GraphQLError } from 'graphql';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // expose all data

  public authErrorMessages$: Observable<GraphQLError[]>;
  public isLoading$: Observable<boolean>;
  public user$: Observable<UserType>;
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(
    localStorage.getItem('visual-knight-token') !== null
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
        localStorage.setItem('visual-knight-token', signupData.token.accessToken);
        this.isAuthenticated$.next(true);
      })
    );
  }
  public login({ email, password }) {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(result => result.data.login),
      tap(loginData => {
        localStorage.setItem('visual-knight-token', loginData.token.accessToken);
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
    localStorage.removeItem('visual-knight-token');
    this.isAuthenticated$.next(false);
    this.apollo.getClient().resetStore();
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
