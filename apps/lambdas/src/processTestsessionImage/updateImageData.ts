import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function updateImageData(
  testSessionId: string,
  imageKey: string,
  state: string,
  diffImageKey?: string,
  diffBaselineRef?: string,
  misMatchPercentage?: number,
  isSameDimensions?: boolean
) {
  const mutation = gql`
    mutation updateImageKeys(
      $testSessionId: ID!,
      $imageKey: String!,
      $state: TestSessionState!,
      $diffImageKey: String,
      $misMatchPercentage: Float,
      $isSameDimensions: Boolean
      ${diffBaselineRef ? '$diffBaselineRef: ID!' : ''}
    ) {
      updateTestSession(
        where: {
          id: $testSessionId
        },
        data: {
          imageKey: $imageKey
          diffImageKey: $diffImageKey,
          misMatchPercentage: $misMatchPercentage,
          isSameDimensions: $isSameDimensions,
          state: $state
          ${
            diffBaselineRef
              ? ', baselineForDiffRef: {connect: {id: $diffBaselineRef}}'
              : ''
          }
        }
      ) {
        id
        imageKey
        diffImageKey
        misMatchPercentage
      }
    }
  `;

  const variables = {
    testSessionId,
    imageKey,
    state,
    diffImageKey,
    diffBaselineRef,
    misMatchPercentage,
    isSameDimensions
  };
  console.log('Update image data', variables);
  return client
    .request<UpdateImageDataResponse>(mutation, variables)
    .then(data => {
      return data.updateTestSession;
    });
}

interface UpdateImageDataResponse {
  updateTestSession: {
    id: string;
    imageKey: string;
    diffImageKey: string;
    misMatchPercentage: number;
  };
}
