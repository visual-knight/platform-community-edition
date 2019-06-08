import { prismaClient } from '@platform-community-edition/prisma';

export async function loadTestSessionData(testSessionId: string) {
  const testSession = await prismaClient.testSession({ id: testSessionId });
  const baselineVariationRef = await prismaClient
    .testSession({ id: testSessionId })
    .variation()
    .baselineVariationRef();
  const variation = await prismaClient
    .testSession({ id: testSessionId })
    .variation()
    .baselineVariationRef();

  return {
    baselineVariationRef,
    misMatchTolerance: testSession.misMatchTolerance,
    autoBaseline: testSession.autoBaseline,
    variationId: variation.id
  };
}
