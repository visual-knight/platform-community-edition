import { Injectable } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';

@Injectable()
export class CloudProviderZeitService extends CloudProviderService {
  async generateScreenshotUploadUrl(): Promise<string> {
    return Promise.resolve('url');
  }
}
