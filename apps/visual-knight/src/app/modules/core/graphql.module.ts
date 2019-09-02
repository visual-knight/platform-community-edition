import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../../environments/environment';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const uri = environment.graphql.uri; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
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

  return {
    link: concat(authMiddleware, http),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
