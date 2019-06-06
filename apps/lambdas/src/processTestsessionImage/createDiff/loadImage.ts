import { S3 } from 'aws-sdk';

const S3Instance = new S3();

export async function loadImage(Bucket: string, Key: string): Promise<S3.Body> {
  console.log('Load image from S3: ', Key, 'in Bucket: ', Bucket);
  const object = await S3Instance.getObject({
    Bucket,
    Key
  }).promise();
  return object.Body;
}
