import { TestBed, async, inject } from '@angular/core/testing';

import { AllowInvitationRouteGuard } from './allow-invitation-route.guard';

describe('AllowInvitationRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllowInvitationRouteGuard]
    });
  });

  it('should ...', inject([AllowInvitationRouteGuard], (guard: AllowInvitationRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
