import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../../environments/environment';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { onError } from 'apollo-link-error';
import { Router } from '@angular/router';
import { resolvers, typeDefs } from './schema';

const uri = environment.graphql.uri;
export function createApollo(httpLink: HttpLink, router: Router) {
  const cache = new InMemoryCache();
  const http = httpLink.create({ uri });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('visual-knight-token');
    if (!token) return forward(operation);

    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });

    return forward(operation);
  });

  const logoutLink = onError(({ graphQLErrors, response }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          err.extensions.code === 'INTERNAL_SERVER_ERROR' &&
          err.extensions.exception.status === 401
        ) {
          localStorage.removeItem('visual-knight-token');
          router.navigateByUrl('/user');
        }
      }
    }
  });

  initLocaleState(cache);

  return {
    cache,
    typeDefs,
    resolvers,
    link: authMiddleware.concat(logoutLink.concat(http)),
    defaultOptions: {
      query: { fetchPolicy: 'network-only' },
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  };
}

function initLocaleState(cache: InMemoryCache) {
  cache.writeData({
    data: {
      selectedTestSession: null
    }
  });
}

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router]
    }
  ]
})
export class GraphQLModule {}
