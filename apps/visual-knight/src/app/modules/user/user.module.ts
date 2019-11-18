import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { ClipboardModule } from 'ngx-clipboard';
import { MatTabsModule } from '@angular/material';
import { VerificationBoxComponent } from './components/verification-box/verification-box.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'profile',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    VerificationBoxComponent,
    AccountManagementComponent,
    UserManagementComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaKey } as RecaptchaSettings
    },
    UserService
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    RouterModule.forChild(routes),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    MatTabsModule
  ]
})
export class UserModule {}
