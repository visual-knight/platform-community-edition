import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudProviderService {
  async saveScreenshotImage(image: Buffer, filename: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
