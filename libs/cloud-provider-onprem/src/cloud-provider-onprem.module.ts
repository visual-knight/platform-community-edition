import { Module, DynamicModule } from '@nestjs/common';
import { CloudProviderOnpremService } from './cloud-provider-onprem.service';
import { CloudProviderService } from '@visual-knight/api-interface';
import { resolve } from 'path';

@Module({
  providers: [
    {
      provide: CloudProviderService,
      useClass: CloudProviderOnpremService
    }
  ],
  exports: [CloudProviderService]
})
export class CloudProviderOnpremModule {
  static register(config: { dest?: string } = {}): DynamicModule {
    return {
      module: CloudProviderOnpremModule,
      providers: [
        {
          provide: 'IMAGE_DESTINATION_PATH',
          useValue: config.dest || resolve(process.cwd(), 'screenshotUploads')
        }
      ]
    };
  }
}
