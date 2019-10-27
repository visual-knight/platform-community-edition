import { Injectable } from '@angular/core';
import {
  AllTestsGQL,
  DeleteTestGQL,
  AllTestsQuery,
  AllTestsDocument
} from '../../core/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(
    private allTestsGQL: AllTestsGQL,
    private deleteTestGQL: DeleteTestGQL
  ) {}

  testList() {
    return this.allTestsGQL.watch().valueChanges;
  }

  removeTest(testId: string) {
    return this.deleteTestGQL.mutate(
      { id: testId },
      {
        update: (
          store,
          {
            data: {
              deleteTest: { id }
            }
          }
        ) => {
          const data: AllTestsQuery = store.readQuery({
            query: AllTestsDocument
          });
          data.tests = data.tests.filter(test => test.id !== id);
          store.writeQuery({ query: AllTestsDocument, data });
        }
      }
    );
  }
}
