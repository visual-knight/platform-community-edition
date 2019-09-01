import gql from 'graphql-tag';
import { Test } from '@generated/photonjs';

const testDataFragment = gql`
  fragment TestData on Test {
    id
    name
    variations {
      id
      createdAt
      browserName
      deviceName
    }
  }
`;

export const allTestsQuery = gql`
  query {
    tests {
      ...TestData
    }
  }
  ${testDataFragment}
`;

export const deleteTestMutation = gql`
  mutation deleteTest($id: ID!) {
    deleteTest(where: { id: $id }) {
      id
    }
  }
`;
export interface DeleteTestMutationResponse {
  deleteTest: { id: string };
}

export interface AllTestsQueryResponse {
  tests: Test[];
  errors?: any[];
}
