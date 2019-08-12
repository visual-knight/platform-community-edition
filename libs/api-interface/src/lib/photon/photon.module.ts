import { Module } from '@nestjs/common';
import { PhotonService } from './photon.service';

@Module({
  providers: [PhotonService],
  exports: [PhotonService]
})
export class PhotonModule {}
