import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VerifyEmailResolverService } from './services/verify-email-resolver.service';
import { VerifyInvitationComponent } from './components/verify-invitation/verify-invitation.component';
import { MissingTokenRouteGuard } from './services/missing-token-route.guard';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [VerifyEmailResolverService, MissingTokenRouteGuard],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
