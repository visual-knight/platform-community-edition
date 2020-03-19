import { TestBed } from '@angular/core/testing';
import { VariationService } from './variation.service';
import { Apollo } from 'apollo-angular';

describe('VariationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [VariationService, { provide: Apollo, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: VariationService = TestBed.get(VariationService);
    expect(service).toBeTruthy();
  });
});
