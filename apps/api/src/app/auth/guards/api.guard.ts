import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PhotonService } from '@visual-knight/api-interface';
import { Request } from 'express';

@Injectable()
export class GqlApiGuard implements CanActivate {
  constructor(private readonly photonService: PhotonService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;
    try {
      await this.photonService.users.findOne({
        where: { apiKey: request.header('x-api-key') }
      });
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
