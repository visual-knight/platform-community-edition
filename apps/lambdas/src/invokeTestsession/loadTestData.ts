import { Prisma } from '@platform-community-edition/prisma';

const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function loadTestData(projectId: string, testname: string) {
  const tests = await prisma.tests({
    where: { name: testname, project: { id: projectId } }
  });

  return {
    test: tests.length > 0 ? tests[0] : null
  };
}
