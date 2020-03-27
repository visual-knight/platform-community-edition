import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'screenshotImage'
})
export class ScreenshotImagePipe implements PipeTransform {
  transform(value: string): string {
    if (value)
      return environment.apiEndpoint + environment.screenshotsPath + value;
    else return '../../../assets/images/no-img.jpg';
  }
}
