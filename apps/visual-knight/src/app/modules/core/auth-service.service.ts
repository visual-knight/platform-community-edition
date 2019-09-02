import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { User, CurrentUserGQL } from '../../../modules/core/types';
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

  constructor(private currentUserGQL: CurrentUserGQL) {
    const currentUser$ = this.currentUserGQL.watch().valueChanges;

    this.user$ = currentUser$.pipe(map(result => result.data.me));
    this.isLoading$ = currentUser$.pipe(map(result => result.loading));
    this.authErrorMessages$ = currentUser$.pipe(map(result => result.errors));
  }

  get authenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public signUp({ email, password }) {}
  public login({ email, password }) {}
  public logOut() {}

  private authenticateUser(UserCredential) {}
  private handleSignUpLoginError(error: { code: string; message: string }) {}
}
