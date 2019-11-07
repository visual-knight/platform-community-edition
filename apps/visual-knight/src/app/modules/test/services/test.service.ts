import { Injectable } from '@angular/core';
import {
  AllTestsGQL,
  DeleteTestGQL,
  AllTestsQuery,
  AllTestsDocument,
  TestType
} from '../../core/types';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(
    private allTestsGQL: AllTestsGQL,
    private deleteTestGQL: DeleteTestGQL,
    private apollo: Apollo
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

  setSelectedTest(test: TestType) {
    this.apollo.getClient().writeData({
      data: { selectedTest: test.id }
    });
  }
}
