import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthLoadGuard implements CanLoad {
  constructor(private store: Store) {}
  canLoad() {
    // return this.store.selectOnce(AuthState.isAuthenticated).pipe(
    //   filter(isAuthenticated => isAuthenticated !== null)
    // );
    return !!localStorage.getItem('token');
  }
}
