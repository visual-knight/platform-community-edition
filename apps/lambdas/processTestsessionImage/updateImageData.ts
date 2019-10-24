import {
  prismaClient,
  TestSessionState
} from '@platform-community-edition/prisma';

export async function updateImageData(
  testSessionId: string,
  imageKey: string,
  state: TestSessionState,
  diffImageKey?: string,
  diffBaselineRef?: string,
  misMatchPercentage?: number,
  isSameDimensions?: boolean
) {
  const testSession = await prismaClient.updateTestSession({
    where: { id: testSessionId },
    data: {
      imageKey,
      diffImageKey,
      misMatchPercentage,
      isSameDimensions,
      state,
      baselineForDiffRef: diffBaselineRef
        ? { connect: { id: diffBaselineRef } }
        : null
    }
  });

  console.log('Update image data');
  return testSession;
}
