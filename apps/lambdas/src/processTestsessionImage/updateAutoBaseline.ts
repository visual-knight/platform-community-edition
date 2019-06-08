import { prismaClient } from '@platform-community-edition/prisma';

export async function updateAutoBaseline(
  imageKey: string,
  testSessionId: string,
  variationId: string
) {
  await prismaClient.updateVariation({
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
