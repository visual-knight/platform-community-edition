import { Observable } from 'rxjs';
// TODO: clearify import -> import { DataSource } from '@angular/cdk/collections';
import { Test } from '@generated/photonjs';

export class TestsDataSource extends DataSource<Test> {
  constructor(private tests$: Observable<Test[]>) {
    super();
  }

  connect() {
    return this.tests$;
  }

  disconnect() {}
}
