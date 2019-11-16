import { Module, Logger, Provider } from '@nestjs/common';
import { APIGateway, Lambda, S3 } from 'aws-sdk';
import { PhotonModule } from '@visual-knight/api-interface';
import { CloudProviderOnpremModule } from '@visual-knight/cloud-provider-onprem';
import { StaticController } from './static/static.controller';

const services: Provider[] = [Logger];

@Module({
  imports: [PhotonModule, CloudProviderOnpremModule],
  providers: [...services],
  exports: [...services, PhotonModule, CloudProviderOnpremModule],
  controllers: [StaticController]
})
export class SharedModule {}
