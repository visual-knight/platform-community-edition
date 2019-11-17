import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VerifyInvitationComponent } from './components/verify-invitation/verify-invitation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VerifyEmailComponent, VerifyInvitationComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule]
})
export class AuthModule {}
