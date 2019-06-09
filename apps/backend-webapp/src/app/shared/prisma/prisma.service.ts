import { Injectable } from '@nestjs/common';
import { Prisma } from '@platform-community-edition/prisma';
import { environment } from '../../../environments/environment';

@Injectable()
export class PrismaService {
  // constructor() {
  //   super({
  //     endpoint: environment.prisma.endpoint,
  //     secret: environment.prisma.secret,
  //     debug: environment.production
  //   });
  // }
  client: Prisma = new Prisma({
    endpoint: environment.prisma.endpoint,
    secret: environment.prisma.secret,
    debug: environment.production
  });

  constructor() {}
}
