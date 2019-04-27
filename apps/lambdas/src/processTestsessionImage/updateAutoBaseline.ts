import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function updateAutoBaseline(
  imageKey: string,
  testSessionId: string,
  variationId: string
) {
  const variables = {
    imageKey,
    testSessionId,
    variationId
  };
  const mutation = gql`
    mutation updateData(
      $variationId: ID!
      $testSessionId: ID!
      $imageKey: String!
    ) {
      updateVariation(
        where: { id: $variationId }
        data: {
          baselineVariationRef: { connect: { id: $testSessionId } }
          testSessions: {
            update: {
              where: { id: $testSessionId }
              data: {
                imageKey: $imageKey
                isSameDimensions: true
                misMatchPercentage: 0
                state: ACCEPTED
              }
            }
          }
        }
      ) {
        id
      }
    }
  `;

  await client.request(mutation, variables);
}
