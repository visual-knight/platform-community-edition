import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad() {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/user'])
      return false;
    }
    return true;
  }

  canActivate() {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/user'])
      return false;
    }
    return true;
  }
}
