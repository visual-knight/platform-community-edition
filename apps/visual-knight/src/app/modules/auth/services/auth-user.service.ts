import { Injectable } from '@angular/core';
import { first, tap, map, catchError } from 'rxjs/operators';
import { VerifyEmailGQL, CompleteInvitationGQL } from '../../core/types';
import { ACTIVATION_STATE, AuthService } from '../../core/auth-service.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  constructor(
    private authService: AuthService,
    private verifyEmailGQL: VerifyEmailGQL,
    private completeInvitationGQL: CompleteInvitationGQL
  ) {}

  completeInvitation(token: string, password: string) {
    return this.completeInvitationGQL.mutate({ token, password }).pipe(
      first(),
      tap(({ data }) => {
        localStorage.setItem('visual-knight-token', data.completeInvitation.token.accessToken);
        this.authService.isAuthenticated$.next(true);
      })
    );
  }

  verifyEmail(token: string) {
    return this.verifyEmailGQL
      .mutate(
        { token },
        {
          fetchPolicy: 'no-cache'
        }
      )
      .pipe(first())
      .pipe(
        map(() => ACTIVATION_STATE.DONE),
        catchError(error => {
          return of(error.graphQLErrors[0].message as ACTIVATION_STATE);
        })
      );
  }
}
