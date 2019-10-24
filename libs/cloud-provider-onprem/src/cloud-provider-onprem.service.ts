import { Injectable, Inject } from '@nestjs/common';
import { CloudProviderService } from '@visual-knight/api-interface';
import { writeFile, readFile } from 'fs';
import { resolve } from 'path';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CloudProviderOnpremService extends CloudProviderService {
  constructor(
    @Inject('IMAGE_DESTINATION_PATH') private imageDestinationPath: string
  ) {
    super();
  }

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
}
