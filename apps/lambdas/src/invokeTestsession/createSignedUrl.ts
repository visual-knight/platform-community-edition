import { S3 } from 'aws-sdk';
const S3Instance = new S3();
const imageBucketName = process.env.imageBucketName;

export async function createSignedUrl(testSessionId: string) {
  return S3Instance.getSignedUrl('putObject', {
    Bucket: imageBucketName,
    Key: `${testSessionId}.screenshot.png`
  });
}
