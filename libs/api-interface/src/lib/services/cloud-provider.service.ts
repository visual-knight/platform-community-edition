import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudProviderService {
  generateScreenshotUploadUrl(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
