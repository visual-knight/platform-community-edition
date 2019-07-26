import { Module, Logger, Provider } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  AwsConfigService,
  AwsApiGatewayService,
  AwsLambdaService
} from './aws';
import { APIGateway, Lambda, IAM, S3 } from 'aws-sdk';
import { AwsS3Service } from './aws/aws-s3.service';
import { PhotonModule } from '@platform-community-edition/prisma2';

const services: Provider[] = [PrismaService, Logger];

@Module({
  imports: [PhotonModule],
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
    ...services
  ],
  exports: [...services, AwsApiGatewayService, PhotonModule]
})
export class SharedModule {}
