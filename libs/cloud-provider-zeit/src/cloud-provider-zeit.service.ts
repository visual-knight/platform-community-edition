import { Injectable } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';

@Injectable()
export class CloudProviderZeitService extends CloudProviderService {
  async saveScreenshotImage(image: Buffer, filename: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
