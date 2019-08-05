import gql from 'graphql-tag';
import { Project } from '../shared/models/project.model';

const projectDataFragment = gql`
  fragment ProjectData on Project {
    id
    name
    description
    _testsMeta {
      count
    }
    users {
      email
      forename
      lastname
    }
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

export const subscribeProjects = gql`
  subscription {
    project {
      node {
        id
        name
        description
        _testsMeta {
          count
        }
        users {
          email
          forename
          lastname
        }
      }
    }
  }
`;

export const projectQuery = gql`
  query project($projectID: ID!) {
    Project(id: $projectID) {
      ...ProjectData
    }
  }
  ${projectDataFragment}
`;

export const addProjectMutation = gql`
  mutation addProject($projectName: String!, $description: String!) {
    createProject(data: { name: $projectName, description: $description }) {
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

export interface ProjectQueryResponse {
  Project: Project;
}

export interface AllProjectQueryResponse {
  projects: [Project];
}
