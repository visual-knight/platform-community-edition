import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, CurrentUserGQL, SignupGQL, LoginGQL } from './types';
import { map } from 'rxjs/operators';
import { GraphQLError } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // expose all data

  public authErrorMessages$: Observable<readonly GraphQLError[]>;
  public isLoading$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(private currentUserGQL: CurrentUserGQL, private signupGQL: SignupGQL, private loginGQL: LoginGQL) {
    const currentUser$ = this.currentUserGQL.watch().valueChanges;

    this.user$ = currentUser$.pipe(map(result => result.data.me));
    this.isLoading$ = currentUser$.pipe(map(result => result.loading));
    this.authErrorMessages$ = currentUser$.pipe(map(result => result.errors));
  }

  get authenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public signup({ email, password }) {
    return this.signupGQL.mutate({email, password})
  }
  public login({ email, password }) {
    return this.loginGQL.mutate({email, password}).pipe(map(result => result.data.signup));
  }
  public logout() {}
}
