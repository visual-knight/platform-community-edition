import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ACTIVATION_STATE } from '../../core/auth-service.service';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class VerifyEmailResolverService implements Resolve<String> {
  constructor(private authUserService: AuthUserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ACTIVATION_STATE> {
    const token = route.queryParamMap.get('token');

    return this.authUserService.verifyEmail(token);
  }
}
