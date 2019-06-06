import { loadImage } from './loadImage';
import { PNG } from 'pngjs';
import Pixelmatch from 'pixelmatch';
import { S3 } from 'aws-sdk';
import { uploadDiffImage } from './uploadDiffImage';

const threshold = parseFloat(process.env.threshold);
const includeAA: boolean = !!process.env.includeAA;

export async function createDiff(
  data: CreateDiffData
): Promise<CreateDiffResult> {
  const srcBucket = data.srcBucket;
  const testSessionId = data.testSessionId;

  let images: S3.Body[];
  try {
    images = await Promise.all([
      loadImage(srcBucket, data.srcKey),
      loadImage(srcBucket, data.baselineVariationRef.imageKey)
    ]);
  } catch (error) {
    return error;
  }

  const baseline = PNG.sync.read(new Buffer(images[1].toString()));
  const test = PNG.sync.read(new Buffer(images[0].toString()));
  const isSameDimensions =
    baseline.width === test.width && baseline.height === test.height;

  if (!isSameDimensions) {
    return {
      isSameDimensions
    };
  }

  const diffImageKey = `${testSessionId}.diff.png`;
  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const pixelMisMatchCount = Pixelmatch(
    baseline.data,
    test.data,
    diff.data,
    baseline.width,
    baseline.height,
    {
      threshold,
      includeAA
    }
  );

  await uploadDiffImage(diff, srcBucket, diffImageKey);

  return {
    misMatchPercentage:
      (pixelMisMatchCount * 100) / (baseline.width * baseline.height) / 100,
    isSameDimensions,
    diffImageKey
  };
}

interface CreateDiffData {
  srcBucket: string;
  testSessionId: string;
  srcKey: string;
  baselineVariationRef: {
    imageKey: string;
    id: string;
  };
}

interface CreateDiffResult {
  misMatchPercentage?: number;
  isSameDimensions: boolean;
  diffImageKey?: string;
}
