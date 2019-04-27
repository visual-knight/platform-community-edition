import { S3Handler } from 'aws-lambda';

import { loadTestSessionData } from './loadTestsessionData';
import { createDiff } from './invokeCreateDiff';
import { updateImageData } from './updateImageData';
import { updateAutoBaseline } from './updateAutoBaseline';

export const handler: S3Handler = async (event, _context) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  );
  const testSessionId = srcKey.substr(0, srcKey.indexOf('.screenshot.png'));

  console.log(`Load test session data for: ${testSessionId}`);
  const {
    misMatchTolerance,
    baselineVariationRef,
    autoBaseline,
    variationId
  } = await loadTestSessionData(testSessionId);
  console.log(`Loaded data`);

  if (baselineVariationRef) {
    console.log(`Create diff`);
    const createDiffResult = await createDiff(
      srcBucket,
      srcKey,
      testSessionId,
      baselineVariationRef
    );
    const { misMatchPercentage, diffImageKey, isSameDimensions } = JSON.parse(
      createDiffResult.Payload.toString()
    );

    await updateImageData(
      testSessionId,
      srcKey,
      misMatchTolerance < misMatchPercentage || !isSameDimensions
        ? 'UNRESOLVED'
        : 'ACCEPTED',
      diffImageKey,
      baselineVariationRef.id,
      parseFloat(misMatchPercentage),
      isSameDimensions
    );
    console.log('Updated imaged data');
  } else if (autoBaseline) {
    await updateAutoBaseline(srcKey, testSessionId, variationId);
    console.log('Update auto baseline');
  } else {
    await updateImageData(testSessionId, srcKey, 'UNRESOLVED');
    console.log('No baseline image exists');
  }
};
