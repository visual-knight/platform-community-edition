import { prismaClient } from '@platform-community-edition/prisma';

export async function getOrCreateProject(
  project: string,
  apiKey: string
): Promise<string> {
  const user = await prismaClient.user({ apiKey });
  if (!user) {
    throw new Error('Unknown API Key!');
  }

  const projects = await prismaClient
    .user({ apiKey })
    .projects({ where: { OR: [{ name: project }, { id: project }] } });

  if (projects.length > 0) {
    return projects[0].id;
  }

  const createdProject = await prismaClient.createProject({
    name: project,
    users: { connect: { id: user.id } }
  });

  return createdProject.id;
}
