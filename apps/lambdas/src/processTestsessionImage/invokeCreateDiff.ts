import { Lambda } from 'aws-sdk';

const lambda = new Lambda();

export async function createDiff(
  srcBucket: string,
  srcKey: string,
  testSessionId: string,
  baselineVariationRef: {
    imageKey: string;
    id: string;
  }
) {
  const lambdaFunctionConfigCreateTestsession = {
    FunctionName: process.env.CREATE_DIFF_FUNCTION_NAME,
    Payload: JSON.stringify({
      srcBucket,
      srcKey,
      baselineVariationRef,
      testSessionId
    })
  };

  return lambda.invoke(lambdaFunctionConfigCreateTestsession).promise();
}
