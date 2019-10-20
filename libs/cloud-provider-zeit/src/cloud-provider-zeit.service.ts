import { Injectable } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';
import { Observable } from 'rxjs';

@Injectable()
export class CloudProviderZeitService extends CloudProviderService {
  saveScreenshotImage(image: Buffer, filename: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
