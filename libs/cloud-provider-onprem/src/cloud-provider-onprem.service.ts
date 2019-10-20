import { Injectable, Inject } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';
import { writeFile } from 'fs';
import { resolve } from 'path';

@Injectable()
export class CloudProviderOnpremService extends CloudProviderService {
  constructor(
    @Inject('IMAGE_DESTINATION_PATH') private imageDestinationPath: string
  ) {
    super();
  }

  async saveScreenshotImage(image: Buffer, filename: string): Promise<boolean> {
    return new Promise((resolvePromise, reject) => {
      writeFile(resolve(this.imageDestinationPath, filename), image, err => {
        if (err) reject(err);
        resolvePromise(true);
      });
    });
  }
}
