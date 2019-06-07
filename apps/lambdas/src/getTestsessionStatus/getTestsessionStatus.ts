import * as retry from 'bluebird-retry';
import { loadTestSession, LoadTestSessionData } from './loadTestsession';

const appUrl = process.env.APP_URL;

export async function getTestsessionStatus(testsessionId: string) {
  const { testSession, variation } = await retry<LoadTestSessionData>(
    loadTestSession.bind(this, testsessionId),
    {
      interval: 400,
      max_tries: 100
    }
  );

  console.log('final test session data', testSession);
  console.log(testSession);
  return Object.assign(testSession, {
    link: `${appUrl}/test/${testSession.id}/variation/${variation.id}`
  });
}
