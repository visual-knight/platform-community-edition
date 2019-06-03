import { getTestQuery, GetTestData } from './loadTestData.graphql';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function loadTestData(projectId: string, testname: string) {
  const variables = {
    testname,
    projectId
  };
  const { project, tests } = await client.request<GetTestData>(
    getTestQuery,
    variables
  );

  const contractUserAwsConfig =
    project.users[0].contractUser.contractUserAwsConfig;

  return {
    test: tests.length > 0 ? tests[0] : null,
    accessKeyId: contractUserAwsConfig.accessKeyId,
    secretAccessKey: contractUserAwsConfig.secretAccessKey,
    contractId: project.users[0].contractUser.id
  };
}
