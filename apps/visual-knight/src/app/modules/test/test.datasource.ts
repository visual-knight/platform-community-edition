import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { TestType } from '../core/types';

export class TestsDataSource extends DataSource<TestType> {
  constructor(private tests$: Observable<TestType[]>) {
    super();
  }

  connect() {
    return this.tests$;
  }

  disconnect() {}
}
