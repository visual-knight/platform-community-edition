import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { TestSessionType } from '../../../core/types';

export class TestSessionsDataSource extends DataSource<TestSessionType> {
  constructor(private testSessions$: Observable<TestSessionType[]>) {
    super();
  }

  connect() {
    return this.testSessions$;
  }

  disconnect() {}
}
