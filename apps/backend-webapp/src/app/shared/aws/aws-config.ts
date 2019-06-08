import { Injectable } from '@nestjs/common';
import { Config } from 'aws-sdk';
import { environment } from '../../../environments/environment';

@Injectable()
export class AwsConfigService extends Config {
  constructor() {
    super({
      region: environment.aws.region,
      credentials: {
        accessKeyId: environment.aws.accessKeyId,
        secretAccessKey: environment.aws.secretAccessKey
      }
    });
  }
}
