import { S3 } from 'aws-sdk';
import { PNG } from 'pngjs';

const S3Instance = new S3();

export async function uploadDiffImage(diff: PNG, Bucket: string, Key: string) {
  return new Promise((resolve, reject) => {
    try {
      diff.pack();
      const chunks = [];
      diff.on('data', function(chunk) {
        chunks.push(chunk);
      });
      diff.on('end', function() {
        S3Instance.putObject({
          Bucket,
          Key,
          Body: Buffer.concat(chunks),
          ContentType: 'image/png',
          ACL: 'public-read'
        })
          .promise()
          .then(data => resolve(data));
      });
    } catch (error) {
      reject(error);
    }
  });
}
