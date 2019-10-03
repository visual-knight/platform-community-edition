import { Injectable } from '@angular/core';
import { AllTestsGQL } from '../../core/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private allTests: AllTestsGQL) {}

  testList() {
    return this.allTests.watch().valueChanges;
  }
}
