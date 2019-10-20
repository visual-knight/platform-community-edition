import { Injectable } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';

@Injectable()
export class CloudProviderOnpremService extends CloudProviderService {
  async generateScreenshotUploadUrl(): Promise<string> {
    return Promise.resolve('http://localhost:3333/cloud-provider-onprem/uploadScreenshot');
  }
}
