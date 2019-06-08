import { Prisma, TestSessionState } from '@platform-community-edition/prisma';
const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function updateImageData(
  testSessionId: string,
  imageKey: string,
  state: TestSessionState,
  diffImageKey?: string,
  diffBaselineRef?: string,
  misMatchPercentage?: number,
  isSameDimensions?: boolean
) {
  const testSession = await prisma.updateTestSession({
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
