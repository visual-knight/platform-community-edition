import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { PrismaClient } from '@generated/photonjs';

@Injectable()
export class PhotonService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('DB_URI') db: string) {
    super({
      log: ['INFO', 'QUERY'],
      datasources: { db }
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
