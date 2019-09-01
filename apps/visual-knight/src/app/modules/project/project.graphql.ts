import gql from 'graphql-tag';
import { Project } from '@generated/photonjs';

const projectDataFragment = gql`
  fragment ProjectData on Project {
    id
    name
    description
  }
`;

export const allProjectsQuery = gql`
  query {
    projects {
      ...ProjectData
    }
  }
  ${projectDataFragment}
`;

export const addProjectMutation = gql`
  mutation addProject($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      ...ProjectData
    }
  }
  ${projectDataFragment}
`;

export const deleteProjectMutation = gql`
  mutation($projectId: ID!) {
    deleteProject(where: { id: $projectId }) {
      id
    }
  }
`;

export interface AddProjectQueryResponse {
  createProject: Project;
}

export interface AllProjectQueryResponse {
  projects: [Project];
}
