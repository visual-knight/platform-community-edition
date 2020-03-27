import { ScreenshotImagePipe } from './screenshot-image.pipe';
import { environment } from '../../../../environments/environment';

describe('ScreenshotImagePipe', () => {
  let pipe: ScreenshotImagePipe;

  beforeAll(() => {
    pipe = new ScreenshotImagePipe();
  });

  it('should return no image from server', () => {
    const image = 'image.png';
    expect(pipe.transform(image)).toBe(
      environment.apiEndpoint + environment.screenshotsPath + image
    );
  });

  it('should return no image asset', () => {
    expect(pipe.transform(null)).toBe('../../../assets/images/no-img.jpg');
  });
});
