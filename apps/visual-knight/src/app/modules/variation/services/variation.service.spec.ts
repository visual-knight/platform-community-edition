import { TestBed } from '@angular/core/testing';

import { VariationService } from './variation.service';

describe('VariationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariationService = TestBed.get(VariationService);
    expect(service).toBeTruthy();
  });
});
