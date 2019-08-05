import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { TestSession } from '../shared/models/testsession.model';

export class TestSessionsDataSource extends DataSource<TestSession> {
  constructor(private testSessions$: Observable<TestSession[]>) {
    super();
  }

  connect() {
    return this.testSessions$;
  }

  disconnect() {}
}
