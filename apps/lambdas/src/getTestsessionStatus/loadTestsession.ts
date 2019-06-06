import { GraphQLClient } from 'graphql-request';
import {
  GetTestsessionQueryData,
  GetTestsessionQuery
} from './loadTestsession.graphql';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function loadTestSession(testSessionId: string) {
  const data = await client.request<GetTestsessionQueryData>(
    GetTestsessionQuery,
    {
      testSessionId
    }
  );

  const testSession = data.testSession;
  console.log(testSession);
  if (
    ((testSession.misMatchPercentage === null &&
      testSession.variation.baselineVariationRef !== null) ||
      (testSession.misMatchPercentage === null &&
        testSession.autoBaseline === true)) &&
    testSession.isSameDimensions !== false
  ) {
    console.log('No misMatchPercentage yet');
    throw new Error('No misMatchPercentage yet');
  }
  return testSession;
}
