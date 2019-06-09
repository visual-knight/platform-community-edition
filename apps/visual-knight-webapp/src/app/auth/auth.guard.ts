import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.selectOnce(AuthState.isAuthenticated).pipe(
    //   filter(isAuthenticated => isAuthenticated !== null),
    //   tap(isAuthenticated => {
    //     if (!isAuthenticated) {
    //       this.router.navigate(['/sessions/signin'], { queryParams: { referUrl: state.url } });
    //     }
    //   })
    // );
    return !!localStorage.getItem('token');
  }
}
