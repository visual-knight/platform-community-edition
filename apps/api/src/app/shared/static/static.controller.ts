import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CloudProviderService } from '@visual-knight/api-interface';

@Controller()
export class StaticController {
  constructor(private cloudProviderService: CloudProviderService) {}

  @Get('screenshots/:screenshotFilename')
  async staticScreenshots(
    @Param('screenshotFilename') screenshotFilename: string,
    @Res() res: Response
  ) {
    res.sendFile(
      await this.cloudProviderService.getScreenshotFilepath(screenshotFilename)
    );
  }
}
