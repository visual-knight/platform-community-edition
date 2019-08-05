import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, ACTIVATION_STATE } from '../../shared/auth/auth.service';

@Injectable()
export class VerifyEmailResolverService implements Resolve<String> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ACTIVATION_STATE> {
    const token = route.queryParamMap.get('token');

    return this.authService.verifyEmail(token);
  }
}
