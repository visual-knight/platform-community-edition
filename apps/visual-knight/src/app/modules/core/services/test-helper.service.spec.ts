import { TestBed } from '@angular/core/testing';

import { TestHelperService } from './test-helper.service';

describe('TestHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestHelperService = TestBed.get(TestHelperService);
    expect(service).toBeTruthy();
  });
});
