import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SessionsRoutingModule } from './sessions-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { VerifyInvitationComponent } from './verify-invitation/verify-invitation.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailResolverService } from './verify-email/verify-email-resolver.service';

import { NgxsModule } from '@ngxs/store';
import { SessionsState } from './state/sessions.state';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MissingTokenRouteGuard } from './missing-token-route.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    FlexLayoutModule,
    SessionsRoutingModule,
    NgxsModule.forFeature([SessionsState]),
    SharedModule
  ],
  declarations: [
    ForgotPasswordComponent,
    LockscreenComponent,
    SigninComponent,
    SignupComponent,
    NotFoundComponent,
    ErrorComponent,
    VerifyInvitationComponent,
    VerifyEmailComponent,
    ResetPasswordComponent
  ],
  providers: [VerifyEmailResolverService, MissingTokenRouteGuard]
})
export class SessionsModule {}
