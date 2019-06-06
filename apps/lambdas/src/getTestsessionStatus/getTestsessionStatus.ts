import * as retry from 'bluebird-retry';
import { loadTestSession } from './loadTestsession';

const appUrl = process.env.APP_URL;

export async function getTestsessionStatus(testsessionId: string) {
  const testSessionData = await retry<any>(
    loadTestSession.bind(this, testsessionId),
    {
      interval: 400,
      max_tries: 100
    }
  );

  console.log('final test session data', testSessionData);
  console.log(testSessionData);
  return Object.assign(testSessionData, {
    link: `${appUrl}/test/${testSessionData.id}/variation/${
      testSessionData.variation.id
    }`
  });
}
