import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CloudProviderService {
  saveScreenshotImage(image: Buffer, filename: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
