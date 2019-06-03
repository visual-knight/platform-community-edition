import gql from 'graphql-tag';

export const getTestQuery = gql`
  query getTest($testname: String!, $projectId: ID!) {
    tests(where: { name: $testname, project: { id: $projectId } }) {
      id
      variations {
        browserName
        deviceName
        baselineVariationRef {
          imageKey
          id
        }
        id
      }
    }
    project(where: { id: $projectId }) {
      users(first: 1) {
        contractUser {
          id
          contractUserAwsConfig {
            accessKeyId
            secretAccessKey
            s3BucketLocation
          }
        }
      }
    }
  }
`;

export interface GetTestData {
  tests: InvokeTestsessessionTest[];
  project: {
    users: [
      {
        contractUser: {
          id: string;
          contractUserAwsConfig: {
            accessKeyId: string;
            secretAccessKey: string;
            s3BucketLocation: string;
          };
        };
      }
    ];
  };
}

export interface InvokeTestsessessionTest {
  id: string;
  name: string;
  variations: [
    {
      id: string;
      browserName: string;
      deviceName: string;
      baselineVariationRef: { imageKey: string; id: string };
    }
  ];
}
