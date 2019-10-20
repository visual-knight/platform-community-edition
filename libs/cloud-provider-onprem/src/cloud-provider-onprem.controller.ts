import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloud-provider-onprem')
export class CloudProviderOnpremController {
  @Post('uploadScreenshot')
  @UseInterceptors(FileInterceptor('screenshot'))
  uploadFile(@UploadedFile() file) {
    if(!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }
  }
}
