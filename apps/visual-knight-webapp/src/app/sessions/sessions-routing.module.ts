import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailResolverService } from './verify-email/verify-email-resolver.service';
import { VerifyInvitationComponent } from './verify-invitation/verify-invitation.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MissingTokenRouteGuard } from './missing-token-route.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        component: SignupComponent,
        data: { title: 'Signup' }
      },
      {
        path: 'signin',
        component: SigninComponent,
        data: { title: 'Signin' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'Forgot password' }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [MissingTokenRouteGuard],
        data: { title: 'Reset password' }
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent,
        data: { title: 'Lockscreen' }
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: { title: 'Not Found' }
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: 'Error' }
      },
      {
        path: 'verify',
        component: VerifyEmailComponent,
        resolve: {
          error: VerifyEmailResolverService
        }
      },
      {
        path: 'invitation',
        component: VerifyInvitationComponent,
        canActivate: [MissingTokenRouteGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule {}
