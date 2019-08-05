import { Variation } from '../shared/models/variation.model';
import { Test } from '../shared/models/test.model';
import gql from 'graphql-tag';
import { Project } from '../shared/models/project.model';
import { TestSession } from '../shared/models/testsession.model';

// const testDataFragment = gql`
//   fragment TestData on Test {
//     id
//     name
//     project {
//       id
//     }
//     variations {
//       id
//       createdAt
//       browserName
//       deviceName
//       testSessions(last: 1) {
//         misMatchTolerance
//         misMatchPercentage
//         imageKey
//       }
//     }
//   }
// `;

const testDataFragment = gql`
  fragment TestData on Test {
    id
    name
    project {
      id
    }
    variations {
      id
      createdAt
      browserName
      deviceName
      baselineVariationRef {
        imageKey
        id
      }
      testSessions(last: 1) {
        id
        misMatchTolerance
        misMatchPercentage
        baselineRef {
          id
        }
        imageKey
        state
        stateComment
        autoBaseline
        stateChangedByUser {
          forename
          lastname
          email
        }
      }
      _testSessionsMeta {
        count
      }
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

export const allFilterProjectsQuery = gql`
  query getProjects {
    projects {
      id
      name
    }
  }
`;

export const TESTS_SUBSCRIPTION = gql`
  subscription {
    test {
      mutation
      node {
        id
        name
        project {
          id
        }
        variations {
          id
          createdAt
          browserName
          deviceName
          baselineVariationRef {
            imageKey
            id
          }
          testSessions(last: 1) {
            id
            misMatchTolerance
            misMatchPercentage
            baselineRef {
              id
            }
            imageKey
            state
            stateComment
            autoBaseline
            stateChangedByUser {
              forename
              lastname
              email
            }
          }
          _testSessionsMeta {
            count
          }
        }
      }
      previousValues {
        id
      }
    }
  }
`;

const variationFragment = gql`
  fragment VariationData on Variation {
    id
    deviceName
    additionalData
    baselineVariationRef {
      imageKey
      id
    }
    browserName
    testSessions(orderBy: createdAt_DESC) {
      id
      diffImageKey
      baselineRef {
        id
      }
      imageKey
      misMatchPercentage
      misMatchTolerance
      createdAt
      state
      stateComment
      autoBaseline
      stateChangedByUser {
        forename
        lastname
        email
      }
    }
  }
`;

export const variationQuery = gql`
  query getVariation($variationId: ID!) {
    variation(where: { id: $variationId }) {
      ...VariationData
    }
  }
  ${variationFragment}
`;

export const variationListQuery = gql`
  query allVariations($testId: ID!) {
    variations(where: { test: { id: $testId } }) {
      id
      browserName
      deviceName
      testSessions(last: 1) {
        id
        imageKey
        misMatchPercentage
        misMatchTolerance
        createdAt
        baselineRef {
          id
        }
        state
        stateComment
        autoBaseline
        stateChangedByUser {
          forename
          lastname
          email
        }
      }
    }
  }
`;

export const acceptNewBaselineMutation = gql`
  mutation acceptNewBaseline($testSessionId: ID!, $variationId: ID!, $comment: String) {
    updateVariation(
      where: { id: $variationId }
      data: {
        baselineVariationRef: { connect: { id: $testSessionId } }
        testSessions: { update: { where: { id: $testSessionId }, data: { state: ACCEPTED, stateComment: $comment } } }
      }
    ) {
      ...VariationData
    }
  }
  ${variationFragment}
`;

export const declineTestSessionMutation = gql`
  mutation declineTestSession($testSessionId: ID!, $comment: String) {
    updateTestSession(where: { id: $testSessionId }, data: { state: DECLINED, stateComment: $comment }) {
      id
      state
    }
  }
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

export const deleteVariationMutation = gql`
  mutation deleteVariation($id: ID!) {
    deleteVariation(where: { id: $id }) {
      id
    }
  }
`;
export interface DeleteVariationResponse {
  deleteVariation: { id: string };
}

export interface AcceptNewBaselineMutationResponse {
  updateVariation: Variation;
}

export interface AllTestsQueryResponse {
  tests: Test[];
  errors?: any[];
}

export interface AllFilterProjectsQueryRespons {
  projects: Project[];
}

export interface VariationQueryResponse {
  variation: Variation;
}

export interface VariationListQueryResponse {
  variations: Variation[];
}
