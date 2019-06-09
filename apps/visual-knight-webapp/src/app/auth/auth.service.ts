import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  signinMutation,
  signupMutation,
  forgotPasswordMutation,
  verifyEmailMutation,
  completeInvitationMutation,
  currentUserQuery,
  refreshTokenMutation,
  userVerificationSubscription,
  resetPasswordMutation
} from './auth.graphql';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo, private store: Store) {}

  login(email: string, password: string): Observable<{ token: string; refreshToken: string }> {
    return this.apollo
      .mutate({
        mutation: signinMutation,
        variables: {
          email,
          password
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(map(({ data }) => data.login));
  }

  loadUserInfo() {
    return this.apollo
      .query<{ me: User }>({
        query: currentUserQuery
      })
      .pipe(map(({ data }) => data.me));
  }

  signUp(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: signupMutation,
        variables: {
          email,
          password
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(map(({ data }) => data.signup));
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: forgotPasswordMutation,
        variables: {
          email
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(({ data }) => {
          return data.forgotPassword;
        })
      );
  }

  verifyEmail(token: string): Observable<ACTIVATION_STATE> {
    return this.apollo
      .mutate({
        mutation: verifyEmailMutation,
        variables: {
          token
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(res => {
          return ACTIVATION_STATE.DONE;
        }),
        catchError(error => {
          return of(error.graphQLErrors[0].message as ACTIVATION_STATE);
        })
      );
  }

  refreshAccessToken() {
    return this.apollo
      .mutate({
        mutation: refreshTokenMutation,
        variables: {
          refreshToken: localStorage.getItem('refreshToken')
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(({ data }) => {
          return data.token;
        })
      );
  }

  completeInvitation(token: string, password: string) {
    return this.apollo
      .mutate({
        mutation: completeInvitationMutation,
        variables: {
          token,
          password
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(({ data }) => data.completeInvitation),
        catchError(error => {
          throw <INVITATION_STATE>error.graphQLErrors[0].message;
        })
      );
  }

  subscribeUserVerification() {
    return this.apollo
      .subscribe({
        query: userVerificationSubscription
      })
      .pipe(map(({ data }) => data.user.node.active));
  }

  resetPassword(password: string, token: string) {
    return this.apollo
      .mutate({
        mutation: resetPasswordMutation,
        variables: {
          token,
          password
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(({ data }) => data.resetPassword),
        catchError(error => {
          throw error.graphQLErrors[0].message;
        })
      );
  }
}

export enum ACTIVATION_STATE {
  ALREADY_DONE = 'verification.done',
  EXPIRED = 'verification.expired',
  DONE = 'ok'
}

export enum INVITATION_STATE {
  ALREADY_DONE = 'invitation.done',
  EXPIRED = 'invitation.expired',
  DONE = 'ok'
}
