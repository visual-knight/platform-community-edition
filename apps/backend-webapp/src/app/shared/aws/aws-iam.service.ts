import { Injectable } from '@nestjs/common';
import { IAM } from 'aws-sdk';

@Injectable()
export class AwsIamService extends IAM {}
