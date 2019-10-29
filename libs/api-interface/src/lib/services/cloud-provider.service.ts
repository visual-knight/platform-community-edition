import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CloudProviderService {
  loadImage(filename: string): Observable<Buffer> {
    throw new Error('Method not implemented.');
  }
  saveScreenshotImage(image: Buffer, filename: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getScreenshotFilepath(filename: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
