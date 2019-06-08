import { prismaClient } from '@platform-community-edition/prisma';

export async function loadTestData(projectId: string, testname: string) {
  const tests = await prismaClient.tests({
    where: { name: testname, project: { id: projectId } }
  });

  return {
    test: tests.length > 0 ? tests[0] : null
  };
}
