import gql from 'graphql-tag';

export const getPreconditionDataQuery = gql`
  query getPreconditionData($apiKey: String!, $id: ID!, $projectName: String!) {
    users(
      where: {
        contractUserOwner: { contractUserAwsConfig: { apiKey: $apiKey } }
      }
    ) {
      id
    }
    projects(where: { OR: [{ id: $id }, { name: $projectName }] }) {
      id
    }
  }
`;

export interface PreconditionQueryData {
  projects: [{ id: string }];
  users: [{ id: string }];
}

export const createProjectMutation = gql`
  mutation createProject($userId: ID!, $projectName: String!) {
    createProjectData(
      data: { name: $projectName, users: { connect: { id: $userId } } }
    ) {
      id
    }
  }
`;

export interface CreateProjectData {
  createProjectData: {
    id: string;
  };
}
