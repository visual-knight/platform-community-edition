import { APIGatewayEvent } from 'aws-lambda';

export function getEventData(event: APIGatewayEvent) {
  const {
    test,
    project,
    additional,
    misMatchTolerance,
    autoBaseline
  } = JSON.parse(event.body);

  if (!project || !test || !misMatchTolerance || !additional) {
    throw new Error(
      'Not all required fields are set: project, test, misMatchTolerance, additional'
    );
  }

  return {
    project,
    additional,
    misMatchTolerance,
    autoBaseline,
    testname: test,
    apiKey: event.headers.apiKey
  };
}
