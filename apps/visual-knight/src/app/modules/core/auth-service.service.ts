import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  User,
  CurrentUserGQL,
  SignupGQL,
  LoginGQL,
  ForgotPasswordGQL,
  ResetPasswordGQL
} from './types';
import { map, tap } from 'rxjs/operators';
import { GraphQLError } from 'graphql';
// import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // expose all data

  public authErrorMessages$: Observable<GraphQLError[]>;
  public isLoading$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(
    private router: Router,
    // private apollo: Apollo,
    private currentUserGQL: CurrentUserGQL,
    private signupGQL: SignupGQL,
    private loginGQL: LoginGQL,
    private forgotPasswordGQL: ForgotPasswordGQL,
    private resetPasswordGQL: ResetPasswordGQL
  ) {
    const currentUser$ = this.currentUserGQL.watch().valueChanges;

    this.user$ = currentUser$.pipe(map(result => result.data.me));
    this.isLoading$ = currentUser$.pipe(map(result => result.loading));
    this.authErrorMessages$ = currentUser$.pipe(
      map(result => result.errors)
    ) as any; // use any because of a prettier bug
  }

  get authenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public signup({ email, password }) {
    return this.signupGQL.mutate({ email, password });
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
