import { GraphQLClient } from 'graphql-request';
import { find } from 'lodash';
import { InvokeTestsessessionTest } from './loadTestData.graphql';
import {
  createTestSessionWithExistingVariationMutation,
  createTestSessionWithNewVariationMutation,
  createTestMutation,
  CreateTestSessionData,
  CreateTestData
} from './create.graphql';

const client = new GraphQLClient(process.env.PRISMA_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  }
});

export async function createTestSession(
  test: InvokeTestsessessionTest,
  projectId: string,
  deviceName: string | null = null,
  browserName: string | null = null,
  misMatchTolerance: number,
  autoBaseline: boolean
): Promise<string> {
  let mutation = '';
  const variables = {
    deviceName,
    browserName,
    misMatchTolerance,
    variationId: null,
    testId: null,
    autoBaseline: undefined,
    testname: undefined,
    projectId: undefined
  };
  if (test.id) {
    const variation = find(test.variations, {
      deviceName,
      browserName
    });
    if (variation) {
      mutation = createTestSessionWithExistingVariationMutation;
      variables.variationId = variation.id;
    } else {
      mutation = createTestSessionWithNewVariationMutation;
      variables.testId = test.id;
      variables.autoBaseline = autoBaseline;
    }

    const { createTestSessionData } = await client.request<
      CreateTestSessionData
    >(mutation, variables);
    return createTestSessionData.id;
  } else {
    mutation = createTestMutation;
    variables.testname = test.name;
    variables.projectId = projectId;
    variables.autoBaseline = autoBaseline;
    const { createTest } = await client.request<CreateTestData>(
      mutation,
      variables
    );
    return createTest.variations[0].testSessions[0].id;
  }
}

export interface CreateTestsessionEvent {
  test: string;
  projectId: string;
  deviceName?: string;
  browserName?: string;
  misMatchTolerance: number;
  autoBaseline: boolean;
}
