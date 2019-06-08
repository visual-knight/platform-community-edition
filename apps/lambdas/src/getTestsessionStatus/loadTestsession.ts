import {
  TestSession,
  Variation,
  prismaClient
} from '@platform-community-edition/prisma';

export async function loadTestSession(
  testSessionId: string
): Promise<LoadTestSessionData> {
  const testSession = await prismaClient.testSession({ id: testSessionId });
  const variation = await prismaClient
    .testSession({ id: testSessionId })
    .variation();
  const baselineVariationRef = await prismaClient
    .testSession({ id: testSessionId })
    .baselineRef();

  console.log(testSession);
  if (
    ((testSession.misMatchPercentage === null &&
      baselineVariationRef !== null) ||
      (testSession.misMatchPercentage === null &&
        testSession.autoBaseline === true)) &&
    testSession.isSameDimensions !== false
  ) {
    console.log('No misMatchPercentage yet');
    throw new Error('No misMatchPercentage yet');
  }
  return { testSession, variation };
}

export interface LoadTestSessionData {
  testSession: TestSession;
  variation: Variation;
}
