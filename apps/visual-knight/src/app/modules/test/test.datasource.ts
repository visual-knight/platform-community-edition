import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { TestDataFragment } from '../core/types';

export class TestsDataSource extends DataSource<TestDataFragment> {
  constructor(private tests$: Observable<TestDataFragment[]>) {
    super();
  }

  connect() {
    return this.tests$;
  }

  disconnect() {}
}
