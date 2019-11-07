import gql from 'graphql-tag';
import { TestSessionType, VariationType } from './types';

export const typeDefs = gql`
  extend type Query {
    selectedTestSession: ID!
    selectedTest: ID!
  }

  extend type TestSessionType {
    isSuccessful: Boolean!
  }

  extend type VariationType {
    isLastSuccessful: Boolean!
  }
`;

export const resolvers = {
  TestSessionType: {
    isSuccessful: (testSession: TestSessionType): boolean =>
      isSuccessful(testSession)
  },
  VariationType: {
    isLastSuccessful: (variation: VariationType): boolean =>
      isSuccessful(variation.testSessions[0])
  }
};

function isSuccessful(testSession: TestSessionType): boolean {
  return (
    (testSession.imageKey !== null &&
      testSession.misMatchPercentage !== null &&
      testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
    testSession.misMatchPercentage === null
    //&& !!testSession.baselineRef
  );
}
