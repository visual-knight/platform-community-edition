import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { environment } from '../../../environments/environment';

@Injectable()
export class AwsS3Service extends S3 {
  async deleteS3Images(keys: string[]) {
    console.log(`delete image: ${keys} in Bucket`);
    return this.deleteObjects({
      Bucket: environment.aws.s3BucketName,
      Delete: {
        Objects: keys.map(Key => {
          return { Key };
        }),
        Quiet: true
      }
    }).promise();
  }
}
