import gql from 'graphql-tag';

export const GetTestsessionQuery = gql`
  query getTestSession($testSessionId: ID!) {
    testSession(where: { id: $testSessionId }) {
      id
      misMatchPercentage
      misMatchTolerance
      isSameDimensions
      autoBaseline
      variation {
        id
        baselineVariationRef {
          id
        }
      }
    }
  }
`;

export interface GetTestsessionQueryData {
  testSession: {
    id: string;
    misMatchPercentage: number;
    misMatchTolerance: number;
    isSameDimensions: boolean;
    autoBaseline: boolean;
    variation: {
      id: string;
      baselineVariationRef: {
        id: string;
      };
    };
  };
}
