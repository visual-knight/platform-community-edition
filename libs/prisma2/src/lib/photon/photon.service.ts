import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Photon from '../@generated/photonjs';

@Injectable()
export class PhotonService extends Photon
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
