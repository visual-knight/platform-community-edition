import { Module, Logger, Provider } from '@nestjs/common';
import { PhotonModule } from '@visual-knight/api-interface';
import { StaticController } from './static/static.controller';
import { environment } from '../../environments/environment';

const services: Provider[] = [
  Logger,
  {
    provide: 'DB_URI',
    useFactory: () => {
      if(!environment.db){
        throw new Error("DB connention string is not set in env. Check value of VK_DATABASE")
      }
      return environment.db;
    },
  }
];

@Module({
  imports: [PhotonModule],
  providers: [...services],
  exports: [...services, PhotonModule],
  controllers: [StaticController]
})
export class SharedModule {}
