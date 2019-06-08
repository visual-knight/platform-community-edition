import { Module, Logger, Provider } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AwsService } from './aws/aws.service';
import { StripeService } from './stripe/stripe.service';
import { ProductService } from './product/product.service';
import {
  AwsConfigService,
  AwsApiGatewayService,
  AwsIamService,
  AwsLambdaService
} from './aws';
import { APIGateway, Lambda, IAM, S3 } from 'aws-sdk';
import { AwsS3Service } from './aws/aws-s3.service';

const services: Provider[] = [
  PrismaService,
  Logger,
  ProductService,
  StripeService
];

@Module({
  providers: [
    AwsConfigService,
    {
      provide: AwsApiGatewayService,
      useFactory: (config: AwsConfigService) => {
        return new APIGateway(config);
      },
      inject: [AwsConfigService]
    },
    {
      provide: AwsIamService,
      useFactory: (config: AwsConfigService) => {
        return new IAM(config);
      },
      inject: [AwsConfigService]
    },
    {
      provide: AwsLambdaService,
      useFactory: (config: AwsConfigService) => {
        return new Lambda(config);
      },
      inject: [AwsConfigService]
    },
    {
      provide: AwsS3Service,
      useFactory: (config: AwsConfigService) => {
        return new S3(config);
      },
      inject: [AwsConfigService]
    },
    AwsService,
    ...services
  ],
  exports: [...services, AwsService, AwsApiGatewayService]
})
export class SharedModule {}
