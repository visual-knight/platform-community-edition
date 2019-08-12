import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { ProjectType } from './models/project';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Int } from 'type-graphql';
import { ProjectDataArgs } from './dto/project-data.input';

@Resolver('Project')
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  async project(@Args('projectId') projectId: string): Promise<ProjectType> {
    return this.projectService.getProject(projectId);
  }

  @Query(returns => [ProjectType])
  @UseGuards(GqlAuthGuard)
  async projects(): Promise<ProjectType[]> {
    return this.projectService.getProjects();
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async projectsCount(): Promise<number> {
    return this.projectService.getProjectsCount();
  }

  @Mutation(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  async createProject(
    @Args('data') data: ProjectDataArgs
  ): Promise<ProjectType> {
    return this.projectService.createProject(data);
  }

  @Mutation(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  async deleteProject(
    @Args('projectId') projectId: string
  ): Promise<ProjectType> {
    return this.projectService.deleteProject(projectId);
  }

  @Mutation(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  async updateProject(
    @Args('projectId') projectId: string,
    @Args('data') data: ProjectDataArgs
  ): Promise<ProjectType> {
    return this.projectService.updateProject(projectId, data);
  }
}
