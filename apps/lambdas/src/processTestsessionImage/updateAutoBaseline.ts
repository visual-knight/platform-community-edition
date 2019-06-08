import { Prisma } from '@platform-community-edition/prisma';
const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function updateAutoBaseline(
  imageKey: string,
  testSessionId: string,
  variationId: string
) {
  await prisma.updateVariation({
    where: { id: variationId },
    data: {
      baselineVariationRef: { connect: { id: testSessionId } },
      testSessions: {
        update: {
          where: { id: testSessionId },
          data: {
            imageKey: imageKey,
            isSameDimensions: true,
            misMatchPercentage: 0,
            state: 'ACCEPTED'
          }
        }
      }
    }
  });
}
