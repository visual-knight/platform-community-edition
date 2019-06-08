import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}
