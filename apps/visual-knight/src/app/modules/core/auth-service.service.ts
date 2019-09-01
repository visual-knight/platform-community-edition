import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // expose all data

  public authErrorMessages$ = new Subject<string>();
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new Subject<any>();

  constructor() {}

  private isLoggedIn() {}
  public signUp({ email, password }) {}
  public login({ email, password }) {}
  public logOut() {}

  private authenticateUser(UserCredential) {}
  private handleSignUpLoginError(error: { code: string; message: string }) {}
}
