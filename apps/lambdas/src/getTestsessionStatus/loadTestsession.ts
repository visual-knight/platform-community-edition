import {
  Prisma,
  TestSession,
  Variation
} from '@platform-community-edition/prisma';

const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function loadTestSession(
  testSessionId: string
): Promise<LoadTestSessionData> {
  const testSession = await prisma.testSession({ id: testSessionId });
  const variation = await prisma.testSession({ id: testSessionId }).variation();
  const baselineVariationRef = await prisma
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
