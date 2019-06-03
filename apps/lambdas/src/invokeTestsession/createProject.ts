import { GraphQLClient } from 'graphql-request';
import {
  getPreconditionDataQuery,
  createProjectMutation,
  PreconditionQueryData,
  CreateProjectData
} from './createProject.graphql';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function createProject(
  project: string,
  apiKey: string
): Promise<string> {
  const { projects, users } = await client.request<PreconditionQueryData>(
    getPreconditionDataQuery,
    {
      id: project,
      projectName: project,
      apiKey
    }
  );

  if (projects.length > 0) {
    return projects[0].id;
  }

  const { createProjectData } = await client.request<CreateProjectData>(
    createProjectMutation,
    {
      projectName: project,
      userId: users[0].id
    }
  );

  if (createProjectData) {
    return createProjectData.id;
  }
}
