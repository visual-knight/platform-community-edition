import { HttpLink } from 'apollo-angular-link-http';
import { environment } from '../../environments/environment';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OperationDefinitionNode } from 'graphql';
import { onError } from 'apollo-link-error';
import { Store } from '@ngxs/store';
import { LogoutExpired } from '../auth/state/auth.actions';
import { of } from 'rxjs';
import gql from 'graphql-tag';

export function setupApollo(httpLink: HttpLink, store: Store, httpClient: HttpClient) {
  const http = httpLink.create({ uri: environment.graphQlEndpoint });
  const wsClient = new SubscriptionClient(environment.graphQlSubscriptions, {
    reconnect: false,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || null
    }
  });

  const auth = setContext(() => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      };
    }
  });

  const error = onError(
    ({ graphQLErrors, operation, forward }): any => {
      store.dispatch(new LogoutExpired());
              return of();
    }
  );

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = <OperationDefinitionNode>getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    new WebSocketLink(wsClient),
    auth.concat(http)
  );

  // If your database has unique IDs across all types of objects, you can use
  // a very simple function!
  const cache = new InMemoryCache({
    dataIdFromObject: o => o.id
  });

  return {
    link: error.concat(link),
    cache
  };
}
