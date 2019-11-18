import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { Observable } from 'apollo-link';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad() {
    return this.authService.isAuthenticated$.asObservable().pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) this.router.navigate(['/user']);
      })
    );
  }

  canActivate() {
    return this.authService.isAuthenticated$.asObservable().pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) this.router.navigate(['/user']);
      })
    );
  }
}
