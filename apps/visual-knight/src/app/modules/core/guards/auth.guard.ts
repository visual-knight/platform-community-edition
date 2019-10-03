import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    if (!this.authService.authenticated) {
      this.router.navigate(['/user']);
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    if (!this.authService.authenticated) {
      this.router.navigate(['/user']);
      return false;
    }
    return true;
  }
}
