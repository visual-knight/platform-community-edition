import { Variation } from '../shared/models/variation.model';
import { Observable } from 'rxjs';
import {
  acceptNewBaselineMutation,
  AcceptNewBaselineMutationResponse,
  allTestsQuery,
  AllTestsQueryResponse,
  variationListQuery,
  VariationListQueryResponse,
  variationQuery,
  VariationQueryResponse,
  deleteTestMutation,
  deleteVariationMutation,
  DeleteTestMutationResponse,
  DeleteVariationResponse,
  TESTS_SUBSCRIPTION,
  allFilterProjectsQuery,
  AllFilterProjectsQueryRespons,
  declineTestSessionMutation
} from './test.graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Test } from '../shared/models/test.model';
import { SubscriptionMutation } from '../shared/models/subscription';
import { Store } from '@ngxs/store';
import { TestsLoadedAction } from './state/test.actions';
import { map } from 'rxjs/operators';
import { TestSession } from '../shared/models/testsession.model';

@Injectable()
export class TestService {
  testsQuery: QueryRef<AllTestsQueryResponse>;

  constructor(private apollo: Apollo, private store: Store) {}

  testsSubscription() {
    this.testsQuery = this.apollo.watchQuery<AllTestsQueryResponse>({
      query: allTestsQuery
    });

    this.testsQuery.subscribeToMore({
      document: TESTS_SUBSCRIPTION,
      updateQuery: (prev: AllTestsQueryResponse, { subscriptionData }) => {
        const subscriptionResponse: { data: any; errors?: any } = subscriptionData;
        if (subscriptionResponse.errors || !subscriptionResponse.data.test) {
          return prev;
        }
        const test: Test = subscriptionResponse.data.test.node;
        const mutation: SubscriptionMutation = subscriptionResponse.data.test.mutation;

        switch (mutation) {
          case SubscriptionMutation.CREATED:
            return Object.assign({}, prev, {
              tests: [test, ...prev.tests]
            });
          case SubscriptionMutation.UPDATED:
            return Object.assign({}, prev, {
              tests: prev.tests.map((item, index) => {
                if (item.id !== test.id) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                  ...item,
                  ...test
                };
              })
            });
          case SubscriptionMutation.DELETED:
            return Object.assign({}, prev, {
              tests: prev.tests.filter((item, index) => item.id !== subscriptionResponse.data.test.previousValues.id)
            });
        }
        return prev;
      }
    });
    return this.testsQuery;
  }

  getVariation(variationId: string): Observable<Variation> {
    return this.apollo
      .query<VariationQueryResponse>({
        query: variationQuery,
        variables: { variationId }
      })
      .pipe(
        map(({ data }) => {
          return data.variation;
        })
      );
  }

  getVariationList(testId: string): Observable<Variation[]> {
    return this.apollo
      .query<VariationListQueryResponse>({
        query: variationListQuery,
        variables: { testId }
      })
      .pipe(
        map(({ data }) => {
          return data.variations;
        })
      );
  }

  acceptNewBaseline(testSessionId: string, variationId: string, comment: string): Observable<Variation> {
    return this.apollo
      .mutate<AcceptNewBaselineMutationResponse>({
        mutation: acceptNewBaselineMutation,
        variables: { testSessionId, variationId, comment }
      })
      .pipe(
        map(({ data }) => {
          return data.updateVariation;
        })
      );
  }

  declineTestSession(testSessionId: string, comment: string): Observable<TestSession> {
    return this.apollo
      .mutate({
        mutation: declineTestSessionMutation,
        variables: { testSessionId, comment }
      })
      .pipe(
        map(({ data }) => {
          return data.updateTestSession;
        })
      );
  }

  deleteTest(test: Test) {
    return this.apollo.mutate<DeleteTestMutationResponse>({
      mutation: deleteTestMutation,
      variables: { id: test.id }
    });
  }

  deleteVariation(variation: Variation) {
    return this.apollo.mutate<DeleteVariationResponse>({
      mutation: deleteVariationMutation,
      variables: { id: variation.id }
    });
  }

  loadFilterProjects() {
    return this.apollo
      .query<AllFilterProjectsQueryRespons>({
        query: allFilterProjectsQuery
      })
      .pipe(map(({ data }) => data.projects));
  }
}
