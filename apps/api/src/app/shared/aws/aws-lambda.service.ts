import { Injectable } from '@nestjs/common';
import { Lambda } from 'aws-sdk';

@Injectable()
export class AwsLambdaService extends Lambda {}
