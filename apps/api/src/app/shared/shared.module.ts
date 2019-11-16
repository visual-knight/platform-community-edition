import { Module, Logger, Provider } from '@nestjs/common';
import { PhotonModule } from '@visual-knight/api-interface';
import { StaticController } from './static/static.controller';

const services: Provider[] = [Logger];

@Module({
  imports: [PhotonModule],
  providers: [...services],
  exports: [...services, PhotonModule],
  controllers: [StaticController]
})
export class SharedModule {}
