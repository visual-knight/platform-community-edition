import { TestBed, inject } from '@angular/core/testing';

import { VerifyEmailResolverService } from './verify-email-resolver.service';

describe('VerifyEmailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyEmailResolverService]
    });
  });

  it('should be created', inject([VerifyEmailResolverService], (service: VerifyEmailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
