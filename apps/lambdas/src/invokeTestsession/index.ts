import { getBrowserAndDevice } from './utils';
import { getOrCreateProject } from './createProject';
import { loadTestData } from './loadTestData';
import { createTestSession } from './create';
import { createSignedUrl } from './createSignedUrl';
import { getEventData } from './getEventData';
import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent) => {
  const {
    testname,
    project,
    misMatchTolerance,
    additional,
    autoBaseline,
    apiKey
  } = getEventData(event);

  const { browserName, deviceName } = await getBrowserAndDevice(
    additional.capabilities
  );
  console.log(`Detected browser: ${browserName} and device: ${deviceName}`);
  const projectId = await getOrCreateProject(project, apiKey);
  const { test } = await loadTestData(projectId, testname);

  test.name = testname;
  console.log(`Create test session for user with api key: ${apiKey}`);

  try {
    const testSessionId = await createTestSession(
      test,
      projectId,
      browserName,
      deviceName,
      misMatchTolerance,
      autoBaseline || false
    );

    console.log(`Created test session with id: ${testSessionId}`);
    const url = createSignedUrl(testSessionId);
    console.log(`Signed url created: ${url}`);
    return { url, testSessionId };
  } catch (error) {
    return { message: `Can't create test session`, stack: error };
  }
};
