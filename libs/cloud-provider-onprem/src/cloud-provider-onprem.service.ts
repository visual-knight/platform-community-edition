import { Injectable, Inject } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';
import { writeFile, readFile } from 'fs';
import { resolve } from 'path';
import { Observable, Subject, of } from 'rxjs';

@Injectable()
export class CloudProviderOnpremService implements CloudProviderService {
  constructor(
    @Inject('IMAGE_DESTINATION_PATH') private imageDestinationPath: string
  ) {}

  saveScreenshotImage(image: Buffer, filename: string): Observable<boolean> {
    const subject: Subject<boolean> = new Subject();
    writeFile(resolve(this.imageDestinationPath, filename), image, err => {
      if (err) subject.error(err);
      subject.next(true);
      subject.complete();
    });
    return subject.asObservable();
  }

  loadImage(filename: string): Observable<Buffer> {
    const subject: Subject<Buffer> = new Subject();
    readFile(resolve(this.imageDestinationPath, filename), (err, data) => {
      if (err) subject.error(err);
      subject.next(data);
      subject.complete();
    });
    return subject.asObservable();
  }

  async getScreenshotFilepath(filename: string): Promise<string> {
    return resolve(this.imageDestinationPath, filename);
  }
}
