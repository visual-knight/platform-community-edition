import gql from 'graphql-tag';

export const createTestSessionWithNewVariationMutation = gql`
  mutation createTestSessionWithVariation(
    $testId: ID!
    $browserName: String!
    $deviceName: String!
    $misMatchTolerance: Float!
    $autoBaseline: Boolean!
  ) {
    createTestSessionData(
      data: {
        misMatchTolerance: $misMatchTolerance
        autoBaseline: $autoBaseline
        variation: {
          create: {
            test: { connect: { id: $testId } }
            browserName: $browserName
            deviceName: $deviceName
          }
        }
      }
    ) {
      id
    }
  }
`;

export const createTestSessionWithExistingVariationMutation = gql`
  mutation createTestSessionWithExistingVariation(
    $variationId: ID!
    $misMatchTolerance: Float!
  ) {
    createTestSessionData(
      data: {
        variation: { connect: { id: $variationId } }
        misMatchTolerance: $misMatchTolerance
      }
    ) {
      id
    }
  }
`;

export interface CreateTestSessionData {
  createTestSessionData: {
    id: string;
  };
}

export const createTestMutation = gql`
  mutation createTest(
    $testname: String!
    $projectId: ID!
    $browserName: String!
    $deviceName: String!
    $autoBaseline: Boolean!
    $misMatchTolerance: Float!
  ) {
    createTest(
      data: {
        name: $testname
        project: { connect: { id: $projectId } }
        variations: {
          create: {
            browserName: $browserName
            deviceName: $deviceName
            testSessions: {
              create: {
                misMatchTolerance: $misMatchTolerance
                autoBaseline: $autoBaseline
              }
            }
          }
        }
      }
    ) {
      variations {
        testSessions {
          id
        }
      }
    }
  }
`;

export interface CreateTestData {
  createTest: {
    variations: [{ testSessions: [{ id: string }] }];
  };
}
