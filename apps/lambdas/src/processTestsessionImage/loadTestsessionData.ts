import gql from 'graphql-tag';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function loadTestSessionData(testSessionId: string) {
  const query = gql`
    query getTestSessionWithBaseline($testSessionId: ID!) {
      testSession(where: { id: $testSessionId }) {
        misMatchTolerance
        autoBaseline
        variation {
          id
          baselineVariationRef {
            imageKey
            id
          }
        }
      }
    }
  `;

  return client
    .request<TestSessionData>(query, { testSessionId })
    .then(data => {
      return {
        baselineVariationRef: data.testSession.variation.baselineVariationRef,
        misMatchTolerance: data.testSession.misMatchTolerance,
        autoBaseline: data.testSession.autoBaseline,
        variationId: data.testSession.variation.id
      };
    });
}

interface TestSessionData {
  testSession: {
    misMatchTolerance: number;
    autoBaseline: boolean;
    variation: {
      id: string;
      baselineVariationRef: {
        imageKey: string;
        id: string;
      };
    };
  };
}
