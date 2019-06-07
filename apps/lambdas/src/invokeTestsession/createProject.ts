import { Prisma } from '@platform-community-edition/prisma';
const prisma = new Prisma({
  endpoint: 'http://localhost:4466/hello-world/dev',
  secret: 'mysecret42'
});

export async function getOrCreateProject(
  project: string,
  apiKey: string
): Promise<string> {
  const user = await prisma.user({ apiKey });
  if (!user) {
    throw new Error('Unknown API Key!');
  }

  const projects = await prisma
    .user({ apiKey })
    .projects({ where: { OR: [{ name: project }, { id: project }] } });

  if (projects.length > 0) {
    return projects[0].id;
  }

  const createdProject = await prisma.createProject({
    name: project,
    users: { connect: { id: user.id } }
  });

  return createdProject.id;
}
