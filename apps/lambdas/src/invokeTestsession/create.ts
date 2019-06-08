import { Test, TestSession } from '@platform-community-edition/prisma';
import { prismaClient } from '@platform-community-edition/prisma';

export async function createTestSession(
  test: Test,
  projectId: string,
  deviceName: string | null = null,
  browserName: string | null = null,
  misMatchTolerance: number,
  autoBaseline: boolean
): Promise<string> {
  let testSession: TestSession;

  if (test.id) {
    const variations = await prismaClient.variations({
      where: { test: { id: test.id }, deviceName, browserName }
    });

    // create test session and connect to existing variation
    if (variations.length > 0) {
      testSession = await prismaClient.createTestSession({
        misMatchTolerance,
        autoBaseline,
        variation: {
          connect: { id: variations[0].id }
        }
      });
    } else {
      // create test session and variation
      testSession = await prismaClient.createTestSession({
        misMatchTolerance,
        autoBaseline,
        variation: {
          create: {
            browserName,
            deviceName,
            test: { connect: { id: test.id } }
          }
        }
      });
    }
  } else {
    // create test, test session and variation
    testSession = await prismaClient.createTestSession({
      misMatchTolerance,
      autoBaseline,
      variation: {
        create: {
          browserName,
          deviceName,
          test: {
            create: {
              name: test.name,
              project: { connect: { id: projectId } }
            }
          }
        }
      }
    });
  }

  return testSession.id;
}
