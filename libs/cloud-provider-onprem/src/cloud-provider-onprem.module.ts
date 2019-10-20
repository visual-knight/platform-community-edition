import { Module } from '@nestjs/common';
import { CloudProviderOnpremService } from './cloud-provider-onprem.service';
import { MulterModule } from '@nestjs/platform-express';
import { CloudProviderOnpremController } from './cloud-provider-onprem.controller';
import { CloudProviderService } from '@visual-knight/api-interface';

@Module({
  imports: [
    MulterModule.register({
      dest: 'screenshotUploads'
    })
  ],
  providers: [
    {
      provide: CloudProviderService,
      useClass: CloudProviderOnpremService
    }
  ],
  exports: [CloudProviderService],
  controllers: [CloudProviderOnpremController]
})
export class CloudProviderOnpremModule {}
