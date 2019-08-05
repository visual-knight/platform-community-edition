import { Observable } from 'rxjs';
import { Test } from '../shared/models/test.model';
import { DataSource } from '@angular/cdk/collections';

export class TestsDataSource extends DataSource<Test> {
  constructor(private tests$: Observable<Test[]>) {
    super();
  }

  connect() {
    return this.tests$;
  }

  disconnect() {}
}
