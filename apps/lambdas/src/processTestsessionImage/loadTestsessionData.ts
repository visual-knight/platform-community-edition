import { Prisma } from '@platform-community-edition/prisma';
const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function loadTestSessionData(testSessionId: string) {
  const testSession = await prisma.testSession({ id: testSessionId });
  const baselineVariationRef = await prisma
    .testSession({ id: testSessionId })
    .variation()
    .baselineVariationRef();
  const variation = await prisma
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
