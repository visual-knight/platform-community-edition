import { Injectable } from '@nestjs/common';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';

@Injectable()
export class ComparisonService {
  constructor(
    private photonService: PhotonService,
    private cloudProviderService: CloudProviderService
  ) {}

  async testSession(testSessionId: string) {
    return this.photonService.testSessions.findOne({
      where: { id: testSessionId },
      include: {
        variation: {
          include: {
            baseline: true
          }
        }
      }
    });
  }

  async getOrCreateProject(projectName: string): Promise<string> {
    const projects = await this.photonService.projects({
      where: { OR: [{ name: projectName }, { id: projectName }] }
    });

    if (projects.length > 0) {
      return projects[0].id;
    }

    const createdProject = await this.photonService.projects.create({
      data: {
        name: projectName
      }
    });

    return createdProject.id;
  }

  async getScreenshotUploadUrl(): Promise<string> {
    return await this.cloudProviderService.generateScreenshotUploadUrl();
  }
}
