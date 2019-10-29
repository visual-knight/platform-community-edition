import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'screenshotImage'
})
export class ScreenshotImagePipe implements PipeTransform {
  transform(value: any): any {
    return environment.screenshotsPath + value;
  }
}
