import { getTestsessionStatus } from './getTestsessionStatus';
import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent) => {
  return await getTestsessionStatus(
    event.queryStringParameters['testSessionId']
  );
};
