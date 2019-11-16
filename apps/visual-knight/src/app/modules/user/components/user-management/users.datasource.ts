import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { UserType } from '../../../core/types';

export class UsersDataSource extends DataSource<UserType> {
  constructor(private users$: Observable<UserType[]>) {
    super();
  }

  connect() {
    return this.users$;
  }

  disconnect() {}
}
