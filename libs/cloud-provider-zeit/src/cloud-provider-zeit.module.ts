import { Module } from '@nestjs/common';
import { CloudProviderZeitService } from './cloud-provider-zeit.service';
import { CloudProviderService } from '@visual-knight/api-interface';

@Module({
  providers: [
    {
      provide: CloudProviderService,
      useClass: CloudProviderZeitService
    }
  ],
  exports: [CloudProviderService]
})
export class CloudProviderZeitModule {}
