import { Injectable } from '@nestjs/common';
import { ProjectDataArgs } from './dto/project-data.input';
import { PhotonService } from '@visual-knight/api-interface';
import { Project } from '@generated/photonjs';

@Injectable()
export class ProjectService {
  constructor(private photonService: PhotonService) {}

  createProject(data: ProjectDataArgs): Promise<Project> {
    return this.photonService.projects.create({ data });
  }
  updateProject(projectId: string, data: ProjectDataArgs): Promise<Project> {
    return this.photonService.projects.update({
      where: { id: projectId },
      data
    });
  }
  deleteProject(projectId: string): Promise<Project> {
    return this.photonService.projects.delete({ where: { id: projectId } });
  }
  async getProjectsCount(): Promise<number> {
    return (await this.getProjects()).length;
  }
  getProjects(): Promise<Project[]> {
    return this.photonService.projects.findMany();
  }
  getProject(projectId: string): Promise<Project> {
    return this.photonService.projects.findOne({
      where: { id: projectId }
    });
  }
}
