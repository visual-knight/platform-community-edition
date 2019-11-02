import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    selectedTestSession: ID!
  }
`;

export const resolvers = {
  Mutation: {}
};
