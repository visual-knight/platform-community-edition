import { S3 } from 'aws-sdk';

export async function createSignedUrl(
  accessKeyId: string,
  secretAccessKey: string,
  contractId: string,
  testSessionId: string
) {
  // TODO!: just use 1 common S3 bucket
  const S3Instance = new S3({
    accessKeyId,
    secretAccessKey
  });
  return S3Instance.getSignedUrl('putObject', {
    Bucket: contractId,
    Key: `${testSessionId}.screenshot.png`
  });
}
