import { getBrowserAndDevice } from './utils';
import { createProject } from './createProject';
import { loadTestData } from './loadTestData';
import { createTestSession } from './create';
import { createSignedUrl } from './createSignedUrl';

export const handler = async (event: InvokeTestsessionEvent) => {
  const { browserName, deviceName } = await getBrowserAndDevice(event);
  console.log(`Detected browser: ${browserName} and device: ${deviceName}`);
  const projectId = await createProject(event.project, event.apiKey);
  const { accessKeyId, secretAccessKey, contractId, test } = await loadTestData(
    projectId,
    event.test
  );

  test.name = event.test;
  console.log(`Create test session for contract: ${contractId}`);

  try {
    const testSessionId = await createTestSession(
      test,
      projectId,
      browserName,
      deviceName,
      event.misMatchTolerance,
      event.autoBaseline || false
    );

    console.log(`Created test session with id: ${testSessionId}`);
    const url = createSignedUrl(
      accessKeyId,
      secretAccessKey,
      contractId,
      testSessionId
    );
    console.log(`Signed url created: ${url}`);
    return { url, testSessionId };
  } catch (error) {
    return { message: `Can't create test session`, stack: error };
  }
};

interface InvokeTestsessionEvent {
  apiKey: string;
  test: string;
  project: string;
  addition: {};
  misMatchTolerance: number;
  browserName?: string;
  deviceName?: string;
  autoBaseline?: boolean;
}
