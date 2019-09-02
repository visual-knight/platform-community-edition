import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../../environments/environment';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { onError } from 'apollo-link-error';
import { AuthService } from './auth-service.service';
import { ServerError } from 'apollo-link-http-common';

const uri = environment.graphql.uri; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, auth: AuthService) {
  const http = httpLink.create({ uri: environment.graphql.uri });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token')
          ? `Bearer: ${localStorage.getItem('token')}`
          : null
      )
    });

    return forward(operation);
  });

  const logoutLink = onError(({ networkError }) => {
    if ((networkError as ServerError).statusCode === 401) auth.logout();
  });

  return {
    link: logoutLink.concat(concat(authMiddleware, http)),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService]
    }
  ]
})
export class GraphQLModule {}
